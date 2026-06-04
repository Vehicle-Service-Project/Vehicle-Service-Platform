import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
export class CreateVehicleDto {
  @IsString()
  @MaxLength(25)
  make!: string;

  @IsString()
  @MaxLength(25)
  model!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @MaxLength(4)
  year!: number;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
