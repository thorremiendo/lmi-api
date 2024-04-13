/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './services/sensors.service';
import { ZentracloudService } from './services/zentracloud.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SensorsController],
  providers: [SensorsService, ZentracloudService],
})
export class SensorsModule { }
