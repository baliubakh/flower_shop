import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ParseArray } from '../../decorators/parseArray.decorator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsArray()
  @IsString({ each: true })
  @ParseArray()
  @IsOptional()
  photos?: string[];

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  quantity?: number;
}
