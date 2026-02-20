import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionsService } from './competitions.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CompetitionsService', () => {
  let service: CompetitionsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    competitor: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompetitionsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CompetitionsService>(CompetitionsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findMany on findAll without parameter', async () => {
    mockPrismaService.competitor.findMany.mockResolvedValue([]);
    const result = await service.findAll();
    expect(prisma.competitor.findMany).toHaveBeenCalledWith({
      where: undefined,
      include: { category: true, days: { include: { day: true } } },
    });
    expect(result).toEqual([]);
  });

  it('should call findMany on findAll with parameter', async () => {
    mockPrismaService.competitor.findMany.mockResolvedValue([]);
    const result = await service.findAll(1);
    expect(prisma.competitor.findMany).toHaveBeenCalledWith({
      where: { categoryId: 1 },
      include: { category: true, days: { include: { day: true } } },
    });
    expect(result).toEqual([]);
  });

  it('should call findUnique on findOne', async () => {
    mockPrismaService.competitor.findUnique.mockResolvedValue({ id: 1 });
    const result = await service.findOne(1);
    expect(prisma.competitor.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { category: true, days: { include: { day: true } } },
    });
    expect(result).toEqual({ id: 1 });
  });
});
