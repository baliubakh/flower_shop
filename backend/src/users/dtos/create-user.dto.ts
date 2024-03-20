import { IsEmail, IsEnum, IsPhoneNumber, IsString } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsPhoneNumber()
  phone: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  address: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  zipcode: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirm: string;

  @IsString()
  refresh_token: string;
}
