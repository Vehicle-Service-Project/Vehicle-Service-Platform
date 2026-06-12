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
  @MaxLength(30)
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  name?: string;
}
