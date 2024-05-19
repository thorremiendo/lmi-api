/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BarangaysService } from './barangays.service';
import { BarangaysController } from './barangays.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [BarangaysController],
  providers: [BarangaysService,
    {
      provide: 'PrismaClient',
      useValue: new PrismaClient(),
    },
  ],
})
export class BarangaysModule { }
