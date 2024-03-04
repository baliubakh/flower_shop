import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('user not found');
    const [, storedHash] = user.password.split('.');

    const isMatch = await bcrypt.compare(pass, storedHash);

    console.log(isMatch);

    if (!isMatch) throw new BadRequestException('Bad Password');

    return user;
  }

  async signup(data: Prisma.UserCreateInput): Promise<User> {
    const { email, password } = data;
    // See if email is in use
    const [usersInDb] = await this.usersService.find(email);

    if (usersInDb) throw new BadRequestException('email in use');

    // Hash the users password
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);

    const hash = await bcrypt.hash(password, salt);

    // Join the hashed result and the salt together
    const result = hash;
    // Create a new user and save it

    const user = await this.usersService.create({ ...data, password: result });
    // return the user

    return user;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async signin(email: string, password: string) {}
  async signin(email: string, pass: string): Promise<Partial<User>> {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('user not found');
    const { password, ...userToShow } = user;

    const isMatch = await bcrypt.compare(pass, password);

    if (!isMatch) throw new BadRequestException('Bad Password');

    return userToShow;
  }
}
