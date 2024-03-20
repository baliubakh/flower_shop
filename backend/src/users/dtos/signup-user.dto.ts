import { IsEmail, IsString } from 'class-validator';

export class SignupUserDto {
  @IsEmail()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirm: string;

  @IsString()
  refresh_token: string;
}
