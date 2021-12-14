import { Test, TestingModule } from '@nestjs/testing';
import { ClothesController } from './clothes.controller';
import { ClothesService } from './clothes.service';

describe('ClothesController', () => {
  let controller: ClothesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClothesController],
      providers: [ClothesService],
    }).compile();

    controller = module.get<ClothesController>(ClothesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
