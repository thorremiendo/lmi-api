/* eslint-disable prettier/prettier */
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SensorsService } from './services/sensors.service';
import { SensorDataParamsDto } from './dtos/sensor-data-params.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Sensors')
@Controller('sensors')
export class SensorsController {
    constructor(private sensorService: SensorsService) { }

    @Get()
    getSensorData(@Query() query: SensorDataParamsDto) {
        return this.sensorService.getSensorData(query);
    }

    @Get('readings')
    @ApiQuery({ name: 'device_sn', required: true, type: String, example: 'z6-25616' })
    @ApiQuery({ name: 'readingType', required: true, type: String, example: 'Atmospheric Pressure' })
    getReadings(@Query('device_sn') device_sn: string, @Query('readingType') readingType: string) {
        return this.sensorService.getReadings(device_sn, readingType);
    }

    // @Get('readings')
    // @ApiQuery({ name: 'deviceId', required: true, type: Number })
    // @ApiQuery({ name: 'startDate', required: false, type: String })
    // @ApiQuery({ name: 'endDate', required: false, type: String })
    // async getReadings(
    //     @Query('deviceId', new ParseIntPipe()) deviceId: number,
    //     @Query('startDate') startDate?: string,
    //     @Query('endDate') endDate?: string,
    // ) {
    //     return this.sensorService.getReadings(
    //         deviceId,
    //         startDate && startDate.trim() !== '' ? new Date(startDate) : undefined,
    //         endDate && endDate.trim() !== '' ? new Date(endDate) : undefined
    //     );
    // }
}
