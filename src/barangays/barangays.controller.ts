/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { BarangaysService } from './barangays.service';


@Controller('barangays')
export class BarangaysController {
  constructor(private readonly barangaysService: BarangaysService) { }


  @Get()
  findAll() {
    return this.barangaysService.findAll();
  }

  @Get(':municipalityId')
  findByMunicipalityId(@Param('municipalityId') municipalityId: string) {
    return this.barangaysService.findByMunicipalityId(+municipalityId);
  }

}
