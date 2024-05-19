/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { LandslideCategory, Susceptibility } from '@prisma/client';
import { IsOptional, IsInt, IsString, IsDate } from 'class-validator';

export class CreateLandslideReportDto {
    @ApiProperty({ example: '2022-01-01T00:00:00Z' })
    @IsOptional()
    @IsDate()
    dateOfIncident?: Date;

    @ApiProperty({ example: '2022-01-01T00:00:00Z' })
    @IsOptional()
    @IsDate()
    timeOfIncident?: Date;

    @ApiProperty({ example: '2022-01-01T00:00:00Z' })
    @IsOptional()
    @IsDate()
    dateReported?: Date;

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    municipalityId?: number;

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt()
    barangayId?: number;

    @ApiProperty({ example: '12.34' })
    @IsOptional()
    @IsString()
    latitude?: string;

    @ApiProperty({ example: '56.78' })
    @IsOptional()
    @IsString()
    longitude?: string;

    @ApiProperty({ example: 'John Doe' })
    @IsOptional()
    @IsString()
    approvedBy?: string;

    @ApiProperty({ example: 'Road 1, Road 2' })
    @IsOptional()
    @IsString()
    roadNetworks?: string;

    @ApiProperty({ example: 'Area 1, Area 2' })
    @IsOptional()
    @IsString()
    builtUpAreas?: string;

    @ApiProperty({ example: 10 })
    @IsOptional()
    @IsInt()
    displaced?: number;

    @ApiProperty({ example: 5 })
    @IsOptional()
    @IsInt()
    injured?: number;

    @ApiProperty({ example: 2 })
    @IsOptional()
    @IsInt()
    dead?: number;

    @ApiProperty({ example: LandslideCategory.RockFall })
    @IsOptional()
    landslideCategory?: LandslideCategory;

    @ApiProperty({ example: 'Heavy rain' })
    @IsOptional()
    @IsString()
    triggeringMechanism?: string;

    @ApiProperty({ example: 'Landslide caused by heavy rain' })
    @IsOptional()
    @IsString()
    remarks?: string;

    @ApiProperty({ example: Susceptibility.High })
    @IsOptional()
    landslideSusceptibility?: Susceptibility;

    @ApiProperty({ example: Susceptibility.Low })
    @IsOptional()
    floodingSusceptibility?: Susceptibility;

    @ApiProperty({ example: 'http://example.com/photo.jpg' })
    @IsOptional()
    @IsString()
    photo?: string;

    @ApiProperty({ example: 'Evacuated residents' })
    @IsOptional()
    @IsString()
    actionsTaken?: string;
}   