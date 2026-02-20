import { Test, TestingModule } from '@nestjs/testing';
import { ActsController } from './acts.controller';

describe('ActsController', () => {
  let controller: ActsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActsController],
    }).compile();

    controller = module.get<ActsController>(ActsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
