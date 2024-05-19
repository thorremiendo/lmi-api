/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LandslideReportsService } from './landslide-reports.service';
import { LandslideReportsController } from './landslide-reports.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [LandslideReportsController],
  providers: [LandslideReportsService,
    {
      provide: 'PrismaClient',
      useValue: new PrismaClient(),
    },
  ],
})
export class LandslideReportsModule { }
