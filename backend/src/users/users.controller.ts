import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LocalAuthGuard } from '../guards/local-user.guard';
import { User } from '@prisma/client';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { CookieOptions, Response } from 'express';

export interface IReturnUserType {
  message: string;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

const cookieOptions: CookieOptions = {
  // can only be accessed by server requests
  httpOnly: true,
  // path = where the cookie is valid
  path: '/',
  // secure = only send cookie over https
  secure: true,
  // sameSite = only send cookie if the request is coming from the same origin
  // sameSite: 'none', // "strict" | "lax" | "none" (secure must be true)
  // maxAge = how long the cookie is valid for in milliseconds
  maxAge: 3600000 * 24, // 1 hour
  domain: '.rozsadnyk-solomiya.com',
};

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IReturnUserType> {
    const secretData = await this.authService.signin(req.user);
    res.cookie('auth-cookie', secretData, cookieOptions);
    return { message: 'success' };
  }

  @Post('/signup')
  async signup(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IReturnUserType> {
    const secretData = await this.authService.signup(body);
    res.cookie('auth-cookie', secretData, cookieOptions);
    return { message: 'success' };
  }

  @UseGuards(AccessTokenGuard)
  @Get('signout')
  logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth-cookie', cookieOptions);
    const user = this.authService.logout(req.user['sub']);
    if (user) return { message: 'success' };
    else throw new NotFoundException('user not found');
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IReturnUserType> {
    const { access_token, refresh_token } = await this.authService.getTokens(
      req.user,
    );

    const secretData = {
      access_token,
      refresh_token,
    };
    res.cookie('auth-cookie', secretData, cookieOptions);

    // this.authService.refreshTokens(userId, refreshToken);
    return { message: 'success' };
  }

  @UseGuards(AccessTokenGuard)
  @Get('/profile')
  async findUser(@Request() req): Promise<Partial<User>> {
    const user = await this.usersService.findOne(req.user.sub);
    if (!user) throw new NotFoundException('user not found');
    delete user.password;
    delete user.refresh_token;

    return user;
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/updateMe')
  async updateUser(
    @Request() req,
    @Body() body: UpdateUserDto,
  ): Promise<Partial<User>> {
    const user = await this.usersService.update(parseInt(req.user.sub), body);
    delete user.password;

    return user;
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/deleteMe')
  async disableUser(@Request() req): Promise<Partial<User>> {
    const user = await this.usersService.update(parseInt(req.user.sub), {
      is_active: false,
    });
    delete user.password;

    return user;
  }
}
