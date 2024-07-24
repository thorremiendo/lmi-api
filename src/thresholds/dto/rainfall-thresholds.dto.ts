/* eslint-disable prettier/prettier */
import { IsInt, IsOptional } from 'class-validator';

export class UpdateRainFallThresholdDto {
    @IsOptional()
    @IsInt()
    ra0Min?: number;

    @IsOptional()
    @IsInt()
    ra0Max?: number;

    @IsOptional()
    @IsInt()
    ra1Min?: number;

    @IsOptional()
    @IsInt()
    ra1Max?: number;

    @IsOptional()
    @IsInt()
    ra2Min?: number;

    @IsOptional()
    @IsInt()
    ra2Max?: number;

    @IsOptional()
    @IsInt()
    ra3Min?: number;

    @IsOptional()
    @IsInt()
    ra3Max?: number;
}