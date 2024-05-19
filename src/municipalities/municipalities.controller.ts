/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { MunicipalitiesService } from './municipalities.service';

@Controller('municipalities')
export class MunicipalitiesController {
  
  constructor(private readonly municipalitiesService: MunicipalitiesService) { }

  @Get()
  findAll() {
    return this.municipalitiesService.findAll();
  }
}
