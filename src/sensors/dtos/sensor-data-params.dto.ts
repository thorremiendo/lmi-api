/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsInt,
    IsOptional,
    IsString,
    IsBoolean,
} from 'class-validator';

export class SensorDataParamsDto {
    @ApiProperty({ example: 'z6-12345', required: false })
    @IsString()
    @IsOptional()
    device_sn?: string;

    @ApiProperty({ example: 'test', required: false })
    @IsDateString()
    @IsOptional()
    start_date?: string;

    @ApiProperty({ example: 'test', required: false })
    @IsDateString()
    @IsOptional()
    end_date?: string;

    @ApiProperty({ example: 'test', required: false })
    @IsInt()
    @IsOptional()
    start_mrid?: number;

    @ApiProperty({ example: 'test', required: false })
    @IsInt()
    @IsOptional()
    end_mrid?: number;

    @ApiProperty({ example: 'json', required: false })
    @IsString()
    @IsOptional()
    output_format?: string;

    @ApiProperty({ example: 1, required: false })
    @IsInt()
    @IsOptional()
    page_num?: number;

    @ApiProperty({ example: 1000, required: false })
    @IsInt()
    @IsOptional()
    per_page?: number;

    @ApiProperty({ example: true, required: false })
    @IsBoolean()
    @IsOptional()
    device_depth?: boolean;

    @ApiProperty({ example: 'descending', required: false })
    @IsString()
    @IsOptional()
    sort_by?: string;
}