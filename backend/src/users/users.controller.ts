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
import { Response } from 'express';

export interface IReturnUserType {
  message: string;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

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
    res.cookie('auth-cookie', secretData, {
      httpOnly: true,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
      domain:
        process.env.NODE_ENV === 'development'
          ? 'localhost'
          : 'flower-shop-liard.vercel.app',
    });
    return { message: 'success' };
  }

  @Post('/signup')
  async signup(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IReturnUserType> {
    const secretData = await this.authService.signup(body);
    res.cookie('auth-cookie', secretData, {
      httpOnly: true,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
      domain:
        process.env.NODE_ENV === 'development'
          ? 'localhost'
          : 'flower-shop-liard.vercel.app',
    });
    return { message: 'success' };
  }

  @UseGuards(AccessTokenGuard)
  @Get('signout')
  logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth-cookie', {
      httpOnly: true,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
      domain:
        process.env.NODE_ENV === 'development'
          ? 'localhost'
          : 'flower-shop-liard.vercel.app',
    });
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
    res.cookie('auth-cookie', secretData, {
      httpOnly: true,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
      domain:
        process.env.NODE_ENV === 'development'
          ? '.localhost'
          : '.flower-shop-liard.vercel.app',
    });

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
