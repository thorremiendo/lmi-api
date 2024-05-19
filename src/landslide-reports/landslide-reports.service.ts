/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateLandslideReportDto } from './dto/create-landslide-report.dto';
// import { UpdateLandslideReportDto } from './dto/update-landslide-report.dto';
import { LandslideReport, PrismaClient } from '@prisma/client';

@Injectable()
export class LandslideReportsService {
  constructor(@Inject('PrismaClient') private prisma: PrismaClient) { }

  async create(createLandslideReportDto: CreateLandslideReportDto): Promise<LandslideReport> {
    return this.prisma.landslideReport.create({
      data: createLandslideReportDto,
    });
  }

  async findAll(): Promise<LandslideReport[]> {
    return this.prisma.landslideReport.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} landslideReport`;
  }

  // update(id: number, updateLandslideReportDto: UpdateLandslideReportDto) {
  //   return `This action updates a #${id} landslideReport`;
  // }

  remove(id: number) {
    return `This action removes a #${id} landslideReport`;
  }
}
