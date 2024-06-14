/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ZentracloudService } from './zentracloud.service';
import { SensorDataParamsDto } from '../dtos/sensor-data-params.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SensorsService {

  constructor(private zentraService: ZentracloudService,
    @Inject('PrismaClient') private prisma: PrismaClient) { }


  getSensorData(query: SensorDataParamsDto,) {

    return this.zentraService.getSensorData(query);
  }

  // async getReadings(device_sn: string, readingType: string, from: Date, until: Date) {
  //   return this.prisma.reading.findMany({
  //     where: {
  //       AND: [
  //         {
  //           metadata: {
  //             device_sn: device_sn,
  //           },
  //         },
  //         {
  //           metadata: {
  //             readingType: readingType,
  //           },
  //         },
  //       ],
  //     },
  //     include: {
  //       metadata: true,
  //     },
  //   });
  // }

  async getReadings(device_sn: string, reading_type: string, from?: Date, until?: Date) {
    const whereClause = {
      metadata: {
        device_sn: device_sn,
        readingType: reading_type,
      }
    };

    if (from && until) {
      whereClause['datetime'] = {
        gte: from,
        lte: until,
      };
    }

    return this.prisma.reading.findMany({
      where: whereClause,
      include: {
        metadata: true,
      },
    });
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    const devices = await this.prisma.device.findMany()

    for (const device of devices) {
      await new Promise(resolve => setTimeout(resolve, 60000));

      const params: SensorDataParamsDto = {
        device_sn: device.deviceName,
        start_date: new Date(device.lastFetchDateTime).toISOString(),
        end_date: new Date().toISOString(),
        start_mrid: 3500,
        end_mrid: 3800,
        output_format: 'json',
        page_num: 1,
        per_page: 2000,
        device_depth: true,
        sort_by: 'descending',
      };

      try {
        const data = await this.getSensorData(params).toPromise();
        //Update the lastFetchDateTime for the device
        if (data) {
          const nowUtc = new Date().toISOString();
          await this.prisma.device.update({
            where: {
              id: device.id,
            },
            data: {
              lastFetchDateTime: nowUtc
            },
          })
        }
        // Iterate over each sensor type in the data
        for (const readingType in data.data) {
          console.log("READING TYPE", readingType)
          const sensorData = data.data[readingType][0]

          const sensorDataRecord = await this.prisma.metadata.create({
            data: {
              readingType: readingType,
              port_number: sensorData.metadata.port_number,
              sensor_sn: sensorData.metadata.sensor_sn,
              sensor_name: sensorData.metadata.sensor_name,
              units: sensorData.metadata.units,
              depth: sensorData.metadata.depth,
              device_name: sensorData.metadata.device_name,
              device_sn: sensorData.metadata.device_sn,
            },
          });

          // Iterate over each reading in the sensor data
          for (const reading of sensorData.readings) {
            console.log("READING", reading)
            await this.prisma.reading.create({
              data: {
                metadata: { connect: { id: sensorDataRecord.id } },
                timestamp_utc: reading.timestamp_utc,
                datetime: new Date(reading.datetime).toISOString(),
                tz_offset: reading.tz_offset,
                value: reading.value,
                precision: reading.precision,
                mrid: reading.mrid,
                error_flag: reading.error_flag,
                error_description: reading.error_description,
              },
            });
          }
        }

      } catch (error) {
        console.error(`Error fetching sensor data for device ${device.deviceName}: ${error}`);
      }
    }
  }


}
