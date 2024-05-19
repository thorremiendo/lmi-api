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

  async getReadings(deviceId: number, startDate?: Date, endDate?: Date) {
    const whereClause = {
      sensorData: {
        device: {
          id: deviceId
        }
      }
    };

    if (startDate) {
      whereClause['datetime'] = { ...whereClause['datetime'], gte: startDate };
    }

    if (endDate) {
      whereClause['datetime'] = { ...whereClause['datetime'], lte: endDate };
    }

    return this.prisma.reading.findMany({
      where: whereClause,
      include: {
        sensorData: true
      }
    });
  }

  getSensorData(query: SensorDataParamsDto,) {

    return this.zentraService.getSensorData(query);
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    const devices = await this.prisma.device.findMany();

    for (const device of devices) {
      await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 1 minute

      const params: SensorDataParamsDto = {
        device_sn: device.device_sn,
        start_date: this.formatDate(new Date(device.last_successful_fetch)),
        end_date: this.formatDate(new Date()),
        start_mrid: 3500,
        end_mrid: 3800,
        output_format: 'json',
        page_num: 1,
        per_page: 1000,
        device_depth: true,
        sort_by: 'descending',
      };

      try {
        const data = await this.getSensorData(params).toPromise();
        // Iterate over each sensor type in the data
        for (const sensorType in data.data) {
          const sensorTypeRecord = await this.prisma.sensorType.findUnique({
            where: { name: sensorType },
          });

          if (!sensorTypeRecord) {
            throw new Error(`Unknown sensor type: ${sensorType}`);
          }

          const sensorData = data.data[sensorType][0]
          const sensorDataRecord = await this.prisma.sensorData.create({
            data: {
              device: { connect: { id: device.id } },
              sensorType: { connect: { id: sensorTypeRecord.id } },
              port_number: sensorData.metadata.port_number,
              sensor_sn: sensorData.metadata.sensor_sn,
              sensor_name: sensorData.metadata.sensor_name,
              units: sensorData.metadata.units,
              depth: sensorData.metadata.depth,
            },
          });

          // Iterate over each reading in the sensor data
          for (const reading of sensorData.readings) {
            const existingReading = await this.prisma.reading.findFirst({
              where: { mrid: reading.mrid },
            });

            if (!existingReading) {
              await this.prisma.reading.create({
                data: {
                  sensorData: { connect: { id: sensorDataRecord.id } },
                  timestamp_utc: reading.timestamp_utc,
                  datetime: this.formatDate(new Date(reading.datetime)),
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
        }

        // Update the last_successful_fetch field
        await this.prisma.device.update({
          where: { id: device.id },
          data: { last_successful_fetch: this.formatDate(new Date()) },
        });

      } catch (error) {
        console.error(`Error fetching sensor data for device ${device.device_sn}: ${error}`);
      } finally {
        console.log(`Finished fetching sensor data for device ${device.device_sn}`);
      }
    }
  }

  formatDate(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hour = String(date.getUTCHours()).padStart(2, '0');
    const minute = String(date.getUTCMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${minute}:00.000Z`;
  }
}
