import { Test, TestingModule } from '@nestjs/testing';
import { DaysService } from './days.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DaysService', () => {
  let service: DaysService;
  let prisma: PrismaService;

  const mockPrismaService = {
    day: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DaysService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DaysService>(DaysService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findMany on findAll', async () => {
    mockPrismaService.day.findMany.mockResolvedValue([]);
    const result = await service.findAll();
    expect(prisma.day.findMany).toHaveBeenCalledWith({
      include: {
        acts: true,
        competitors: { include: { competitor: { include: { category: true } } } },
      },
    });
    expect(result).toEqual([]);
  });

  it('should call findUnique on findOne', async () => {
    mockPrismaService.day.findUnique.mockResolvedValue({ id: 1 });
    const result = await service.findOne(1);
    expect(prisma.day.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        acts: true,
        competitors: { include: { competitor: { include: { category: true } } } },
      },
    });
    expect(result).toEqual({ id: 1 });
  });
});
