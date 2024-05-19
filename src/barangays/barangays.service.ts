/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class BarangaysService {

  constructor(@Inject('PrismaClient') private prisma: PrismaClient) { }


  findAll() {
    return `This action returns all barangays`;
  }

  async findByMunicipalityId(municipalityId: number) {
    return this.prisma.barangay.findMany({
      where: {
        municipalityId: municipalityId,
      },
    });
  }

}
