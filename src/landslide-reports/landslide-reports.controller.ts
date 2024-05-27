/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { LandslideReportsService } from './landslide-reports.service';
import { CreateLandslideReportDto } from './dto/create-landslide-report.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { LandslideReport } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
// import { UpdateLandslideReportDto } from './dto/update-landslide-report.dto';
@ApiTags('Reports')
@Controller('reports')
export class LandslideReportsController {
  constructor(private readonly landslideReportsService: LandslideReportsService) { }

  @Post()
  async create(@Body() createLandslideReportDto: CreateLandslideReportDto): Promise<ResponseDto<LandslideReport>> {
    const data = await this.landslideReportsService.create(createLandslideReportDto);
    return new ResponseDto(true, data, 'Landslide report created successfully');
  }

  @Get()
  async findAll(): Promise<ResponseDto<LandslideReport[]>> {
    const data = await this.landslideReportsService.findAll();
    return new ResponseDto(true, data, 'Landslide reports fetched successfully');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.landslideReportsService.findOne(+id);
    return new ResponseDto(true, data, 'Landslide report fetched successfully');
  }

  @Put(':id')
  updateLandslideReport(@Param('id') id: any, @Body() data: Partial<LandslideReport>) {
    return this.landslideReportsService.updateLandslideReport(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landslideReportsService.remove(+id);
  }
}
