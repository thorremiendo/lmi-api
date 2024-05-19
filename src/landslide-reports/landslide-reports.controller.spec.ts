import { Test, TestingModule } from '@nestjs/testing';
import { LandslideReportsController } from './landslide-reports.controller';
import { LandslideReportsService } from './landslide-reports.service';

describe('LandslideReportsController', () => {
  let controller: LandslideReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandslideReportsController],
      providers: [LandslideReportsService],
    }).compile();

    controller = module.get<LandslideReportsController>(LandslideReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
