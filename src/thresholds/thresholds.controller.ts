/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { RainFallThreshold } from '@prisma/client';
import { ThresholdsService } from './thresholds.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateRainFallThresholdDto } from './dto/rainfall-thresholds.dto';

@ApiTags('Thresholds')
@Controller('rainfall-thresholds')
export class ThresholdsController {
    constructor(private readonly rainFallThresholdsService: ThresholdsService) { }

    @Get()
    async findAll(): Promise<RainFallThreshold[]> {
        return this.rainFallThresholdsService.findAll();
    }

    @Get(':observationPeriod')
    async findByObservationPeriod(@Param('observationPeriod', ParseIntPipe) observationPeriod: number): Promise<RainFallThreshold | null> {
        return this.rainFallThresholdsService.findByObservationPeriod(observationPeriod);
    }

    @Put(':observationPeriod')
    async updateByObservationPeriod(
        @Param('observationPeriod', ParseIntPipe) observationPeriod: number,
        @Body() updateData: UpdateRainFallThresholdDto
    ): Promise<RainFallThreshold> {
        return this.rainFallThresholdsService.updateByObservationPeriod(observationPeriod, updateData);
    }

    @Post('reset')
    async resetThresholds(): Promise<void> {
        await this.rainFallThresholdsService.resetThresholds();
    }
}