/* eslint-disable prettier/prettier */
import {
    IsDateString,
    IsInt,
    IsOptional,
    IsString,
    IsBoolean,
} from 'class-validator';

export class SensorDataParamsDto {
    @IsString()
    @IsOptional()
    device_sn?: string;

    @IsDateString()
    @IsOptional()
    start_date?: string;

    @IsDateString()
    @IsOptional()
    end_date?: string;

    @IsInt()
    @IsOptional()
    start_mrid?: number;

    @IsInt()
    @IsOptional()
    end_mrid?: number;

    @IsString()
    @IsOptional()
    output_format?: string;

    @IsInt()
    @IsOptional()
    page_num?: number;

    @IsInt()
    @IsOptional()
    per_page?: number;

    @IsBoolean()
    @IsOptional()
    device_depth?: boolean;

    @IsString()
    @IsOptional()
    sort_by?: string;
}