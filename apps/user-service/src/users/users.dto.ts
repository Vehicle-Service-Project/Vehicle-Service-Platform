import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name!: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
