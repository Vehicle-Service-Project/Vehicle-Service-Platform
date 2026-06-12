import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  userId!: string;

  @IsString()
  @MaxLength(25)
  make!: string;

  @IsString()
  @MaxLength(25)
  model!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1886)
  @Max(2100)
  year?: number;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
