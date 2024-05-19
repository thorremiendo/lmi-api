/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { SensorsService } from './services/sensors.service';
import { SensorDataParamsDto } from './dtos/sensor-data-params.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sensors')
@Controller('sensors')
export class SensorsController {
    constructor(private sensorService: SensorsService) { }

    @Get()
    getSensorData(@Query() query: SensorDataParamsDto) {
        return this.sensorService.getSensorData(query);
    }
}
