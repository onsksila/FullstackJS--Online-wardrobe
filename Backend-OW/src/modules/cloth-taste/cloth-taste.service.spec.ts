import { Test, TestingModule } from '@nestjs/testing';
import { ClothTasteService } from './cloth-taste.service';

describe('ClothTasteService', () => {
  let service: ClothTasteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClothTasteService],
    }).compile();

    service = module.get<ClothTasteService>(ClothTasteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
