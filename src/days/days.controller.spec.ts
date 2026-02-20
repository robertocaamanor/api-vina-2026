import { Test, TestingModule } from '@nestjs/testing';
import { DaysController } from './days.controller';
import { DaysService } from './days.service';

describe('DaysController', () => {
  let controller: DaysController;
  let service: DaysService;

  const mockDaysService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DaysController],
      providers: [
        {
          provide: DaysService,
          useValue: mockDaysService,
        },
      ],
    }).compile();

    controller = module.get<DaysController>(DaysController);
    service = module.get<DaysService>(DaysService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll', async () => {
    mockDaysService.findAll.mockResolvedValue([]);
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should call findOne with correct id', async () => {
    mockDaysService.findOne.mockResolvedValue({ id: 1 });
    const result = await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual({ id: 1 });
  });
});
