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
    return this.prisma.landslideReport.findMany({
      include: {
        Municipality: true,
        Barangay: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<LandslideReport | null> {
    return this.prisma.landslideReport.findUnique({
      where: { id },
      include: {
        Municipality: true,
        Barangay: true,
      },

    });
  }

  async updateLandslideReport(id: any, data: Partial<LandslideReport>): Promise<LandslideReport> {
    return this.prisma.landslideReport.update({
      where: {
        id: parseInt(id)
      },
      data,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} landslideReport`;
  }
}
