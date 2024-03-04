import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LocalAuthGuard } from './guards/local-user.guard';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  // @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(@Body() body: CreateUserDto) {
    const user = await this.authService.signin(body.email, body.password);

    if (!user) throw new NotFoundException('Not Found');

    return user;
  }

  @Post('/signup')
  async signup(@Body() body: CreateUserDto): Promise<UserModel> {
    const user = await this.authService.signup({ ...body });
    return user;
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
