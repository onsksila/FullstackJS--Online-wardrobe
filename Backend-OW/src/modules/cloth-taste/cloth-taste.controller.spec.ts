import { Test, TestingModule } from '@nestjs/testing';
import { ClothTasteController } from './cloth-taste.controller';
import { ClothTasteService } from './cloth-taste.service';

describe('ClothTasteController', () => {
  let controller: ClothTasteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClothTasteController],
      providers: [ClothTasteService],
    }).compile();

    controller = module.get<ClothTasteController>(ClothTasteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
