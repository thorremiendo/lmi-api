/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, RainFallThreshold } from '@prisma/client';
import { UpdateRainFallThresholdDto } from './dto/rainfall-thresholds.dto';

@Injectable()
export class ThresholdsService {

    constructor(@Inject('PrismaClient') private prisma: PrismaClient) { }

    async findAll(): Promise<RainFallThreshold[]> {
        return this.prisma.rainFallThreshold.findMany({
            orderBy: {
                id: 'asc',
            },
        });
    }

    async findByObservationPeriod(observationPeriod: number): Promise<RainFallThreshold | null> {
        return this.prisma.rainFallThreshold.findUnique({
            where: { observationPeriod },
        });
    }


    async updateByObservationPeriod(
        observationPeriod: number,
        updateData: UpdateRainFallThresholdDto
    ): Promise<RainFallThreshold> {
        return this.prisma.rainFallThreshold.update({
            where: { observationPeriod },
            data: updateData,
        });
    }

    async resetThresholds(): Promise<void> {
        const thresholds = [
            {
                observationPeriod: 1,
                ra0Min: 0,
                ra0Max: 202,
                ra1Min: 203,
                ra1Max: 404,
                ra2Min: 405,
                ra2Max: 606,
                ra3Min: 607,
                ra3Max: 9999,
            },
            {
                observationPeriod: 2,
                ra0Min: 0,
                ra0Max: 247,
                ra1Min: 248,
                ra1Max: 494,
                ra2Min: 495,
                ra2Max: 742,
                ra3Min: 743,
                ra3Max: 9999,
            },
            {
                observationPeriod: 3,
                ra0Min: 0,
                ra0Max: 278,
                ra1Min: 279,
                ra1Max: 556,
                ra2Min: 557,
                ra2Max: 834,
                ra3Min: 835,
                ra3Max: 9999,
            },
            {
                observationPeriod: 4,
                ra0Min: 0,
                ra0Max: 323,
                ra1Min: 324,
                ra1Max: 645,
                ra2Min: 646,
                ra2Max: 968,
                ra3Min: 969,
                ra3Max: 9999,
            },
        ];

        for (const threshold of thresholds) {
            await this.prisma.rainFallThreshold.upsert({
                where: { observationPeriod: threshold.observationPeriod },
                update: threshold,
                create: threshold,
            });
        }
    }
}