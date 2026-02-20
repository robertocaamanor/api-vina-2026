import { Test, TestingModule } from '@nestjs/testing';
import { ActsController } from './acts.controller';
import { ActsService } from './acts.service';

describe('ActsController', () => {
  let controller: ActsController;
  let service: ActsService;

  const mockActsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActsController],
      providers: [
        {
          provide: ActsService,
          useValue: mockActsService,
        },
      ],
    }).compile();

    controller = module.get<ActsController>(ActsController);
    service = module.get<ActsService>(ActsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll without category parameter', async () => {
    mockActsService.findAll.mockResolvedValue([]);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalledWith(undefined);
    expect(result).toEqual([]);
  });

  it('should call findAll with category parameter parsed to number', async () => {
    mockActsService.findAll.mockResolvedValue([]);
    const result = await controller.findAll('1');
    expect(service.findAll).toHaveBeenCalledWith(1);
    expect(result).toEqual([]);
  });

  it('should call findOne with correct id', async () => {
    mockActsService.findOne.mockResolvedValue({ id: 1 });
    const result = await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1 });
  });
});
