/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ZentracloudService } from './zentracloud.service';
import { SensorDataParamsDto } from '../dtos/sensor-data-params.dto';

@Injectable()
export class SensorsService {
  private sensors = [];

  constructor(private zentraService: ZentracloudService) { }

  getSensorData(query: SensorDataParamsDto,) {

    return this.zentraService.getSensorData(query);
  }
}
