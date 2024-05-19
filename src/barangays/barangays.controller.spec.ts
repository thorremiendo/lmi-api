import { Test, TestingModule } from '@nestjs/testing';
import { BarangaysController } from './barangays.controller';
import { BarangaysService } from './barangays.service';

describe('BarangaysController', () => {
  let controller: BarangaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarangaysController],
      providers: [BarangaysService],
    }).compile();

    controller = module.get<BarangaysController>(BarangaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
