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

  async getReadings(device_sn: string, readingType: string) {
    return this.prisma.reading.findMany({
      where: {
        AND: [
          {
            metadata: {
              device_sn: device_sn,
            },
          },
          {
            metadata: {
              readingType: readingType,
            },
          },
        ],
      },
      include: {
        metadata: true,
      },
    });
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    const devices = ['z6-25616', 'z6-25617', 'z6-25618', 'z6-25619', 'z6-25620', 'z6-25621']

    for (const device of devices) {
      await new Promise(resolve => setTimeout(resolve, 60000));

      const latestFetch = await this.prisma.lastSuccessfulFetch.findFirst({
        orderBy: {
          id: 'desc',
        },
      });

      const params: SensorDataParamsDto = {
        device_sn: device,
        // start_date: new Date(latestFetch.timestamp).toISOString(),
        start_date: '2024-01-01T00:00:00.000Z',
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

        await this.prisma.lastSuccessfulFetch.create({
          data: { timestamp: new Date() },
        });

        // Iterate over each sensor type in the data
        for (const readingType in data.data) {
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
        console.error(`Error fetching sensor data for device ${device}: ${error}`);
      }
    }
  }


}
