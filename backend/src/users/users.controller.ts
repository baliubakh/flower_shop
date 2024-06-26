import {
  Body,
  Controller,
  Delete,
  Get,
  // HttpStatus,
  NotFoundException,
  // ParseFilePipeBuilder,
  Patch,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LocalAuthGuard } from '../guards/local-user.guard';
import { User } from '@prisma/client';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { CookieOptions, Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { S3Service } from '../s3/s3.service';

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
  // maxAge = how long the cookie is valid for in milliseconds
  maxAge: 3600000 * 24, // 24 hours
  domain:
    process.env.NODE_ENV === 'development'
      ? undefined
      : '.rozsadnyk-solomiya.com',
};

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private s3Service: S3Service,
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
  @UseInterceptors(FileInterceptor('photo'))
  async updateUser(
    @Request() req,
    @Body() body: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Partial<User>> {
    const prevUserData = await this.usersService.findOne(req.user.sub);

    if (!prevUserData) throw new NotFoundException('user not found');

    let photo = prevUserData.photo;
    if (prevUserData.photo && file) {
      const key = prevUserData.photo.split('/')[4];

      this.s3Service.deleteFile(`users/${key}`);
    }
    if (file) {
      const key = `users/${uuidv4()}`;
      photo = await this.s3Service.uploadFile(file, key);
    }
    const user = await this.usersService.update(parseInt(req.user.sub), {
      ...body,
      photo,
    });
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
