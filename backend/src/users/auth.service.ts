import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ITokens } from './users.controller';
import { ConfigService } from '@nestjs/config';
import { SignupUserDto } from './dtos/signup-user.dto';
import { JwtPayload } from './accessToken.strategy';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('user not found');

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) throw new BadRequestException('Bad Password');

    return user;
  }

  async signup(data: SignupUserDto): Promise<ITokens> {
    const { email, password, passwordConfirm } = data;

    if (password !== passwordConfirm)
      throw new BadRequestException('Password does not match');
    delete data.passwordConfirm;
    const [usersInDb] = await this.usersService.find(email);

    if (usersInDb) throw new BadRequestException('User already exists');

    // Hash the users password
    const hash = await this.hashData(password);

    const user = await this.usersService.create({ ...data, password: hash });
    const payload = {
      sub: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };
    const tokens = await this.getTokens(payload);

    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async hashData(data: string) {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);

    const hash = await bcrypt.hash(data, salt);
    return hash;
  }

  async signin(user: User): Promise<ITokens> {
    const payload = {
      sub: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };
    const tokens = await this.getTokens(payload);

    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    return this.usersService.update(userId, { refresh_token: '' });
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refresh_token: hashedRefreshToken,
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refresh_token,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const payload = {
      sub: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async getTokens({ sub, first_name, last_name, role }: JwtPayload) {
    const payload = {
      sub,
      first_name,
      last_name,
      role,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      // remeber
      // ?
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '1d',
      }),
      // : this.jwtService.signAsync(payload, {
      //     secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      //     expiresIn: '30d',
      //   }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
