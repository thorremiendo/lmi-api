import { IsString, IsEmail, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  contactNumber: string;

  @IsNumber()
  @IsOptional()
  municipalityId?: number;

  @IsNumber()
  @IsOptional()
  barangayId?: number;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  contactNumber?: string;

  @IsNumber()
  @IsOptional()
  municipalityId?: number;

  @IsNumber()
  @IsOptional()
  barangayId?: number;
}
