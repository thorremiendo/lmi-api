import { Test, TestingModule } from '@nestjs/testing';
import { BarangaysService } from './barangays.service';

describe('BarangaysService', () => {
  let service: BarangaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BarangaysService],
    }).compile();

    service = module.get<BarangaysService>(BarangaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
