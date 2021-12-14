import { Test, TestingModule } from '@nestjs/testing';
import { DataScrappingController } from './data-scrapping.controller';
import { DataScrappingService } from './data-scrapping.service';

describe('DataScrappingController', () => {
  let controller: DataScrappingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataScrappingController],
      providers: [DataScrappingService],
    }).compile();

    controller = module.get<DataScrappingController>(DataScrappingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
