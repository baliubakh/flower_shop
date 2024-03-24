import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  readonly cartObj: string;
}
