/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsDate } from 'class-validator';

export class CreateLandslideReportDto {
    @ApiProperty({ example: '2022-01-01T00:00:00Z' })
    @IsOptional()
    @IsDate()
    dateOfIncident?: Date;

    @ApiProperty({ example: '2022-01-01T00:00:00Z' })
    @IsOptional()
    @IsDate()
    timeOfIncident?: string;

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

    @ApiProperty({ example: 'John Doe' })
    @IsOptional()
    @IsString()
    approvedBy?: string;

    @ApiProperty({ example: 'Landslide caused by heavy rain' })
    @IsOptional()
    @IsString()
    remarks?: string;

    @ApiProperty({ example: 'http://example.com/photo.jpg' })
    @IsOptional()
    @IsString()
    photo?: string;

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsString()
    status?: number;
}   