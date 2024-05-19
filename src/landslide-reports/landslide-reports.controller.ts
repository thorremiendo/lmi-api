/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.landslideReportsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLandslideReportDto: UpdateLandslideReportDto) {
  //   return this.landslideReportsService.update(+id, updateLandslideReportDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landslideReportsService.remove(+id);
  }
}
