import { Test, TestingModule } from '@nestjs/testing';
import { DataScrappingService } from './data-scrapping.service';

describe('DataScrappingService', () => {
  let service: DataScrappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataScrappingService],
    }).compile();

    service = module.get<DataScrappingService>(DataScrappingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
