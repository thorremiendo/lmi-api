/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MunicipalitiesController } from './municipalities.controller';
import { MunicipalitiesService } from './municipalities.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [MunicipalitiesController],
  providers: [MunicipalitiesService,
    {
      provide: 'PrismaClient',
      useValue: new PrismaClient(),
    },
  ],
})
export class MunicipalitiesModule { }
