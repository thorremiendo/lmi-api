import { Test, TestingModule } from '@nestjs/testing';
import { LandslideReportsService } from './landslide-reports.service';

describe('LandslideReportsService', () => {
  let service: LandslideReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LandslideReportsService],
    }).compile();

    service = module.get<LandslideReportsService>(LandslideReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
