/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsOptional,
    IsString,
} from 'class-validator';

export class GetSensorReadingsDto {
    @ApiProperty({ example: 'z6-12345', required: false })
    @IsString()
    @IsOptional()
    device_sn?: string;
}