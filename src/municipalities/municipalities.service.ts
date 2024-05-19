/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Municipality, PrismaClient } from '@prisma/client';


@Injectable()
export class MunicipalitiesService {

  constructor(@Inject('PrismaClient') private prisma: PrismaClient) { }

  async findAll(): Promise<Municipality[]> {
    return this.prisma.municipality.findMany();
  }

}
