/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SensorsModule } from './sensors/sensors.module';
import { MunicipalitiesModule } from './municipalities/municipalities.module';
import { BarangaysModule } from './barangays/barangays.module';
import { LandslideReportsModule } from './landslide-reports/landslide-reports.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [SensorsModule, MunicipalitiesModule, BarangaysModule, LandslideReportsModule, AuthModule,
    ScheduleModule.forRoot()
  ],
})
export class AppModule { }
