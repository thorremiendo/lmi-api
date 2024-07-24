/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ThresholdsController } from './thresholds.controller';
import { ThresholdsService } from './thresholds.service';


@Module({
    controllers: [ThresholdsController],
    providers: [ThresholdsService,
        {
            provide: 'PrismaClient',
            useValue: new PrismaClient(),
        },
    ],
})
export class ThresholdsModule { }
