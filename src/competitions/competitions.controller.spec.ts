import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionsController } from './competitions.controller';
import { PrismaService } from '../prisma/prisma.service';

describe('CompetitionsController', () => {
  let controller: CompetitionsController;
  let prisma: PrismaService;

  const mockPrismaService = {
    competitor: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetitionsController],
      providers: [
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<CompetitionsController>(CompetitionsController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll without category parameter', async () => {
    mockPrismaService.competitor.findMany.mockResolvedValue([]);
    const result = await controller.findAll();
    expect(prisma.competitor.findMany).toHaveBeenCalledWith({
      where: undefined,
      include: { category: true, days: { include: { day: true } } },
    });
    expect(result).toEqual([]);
  });

  it('should call findAll with category parameter parsed to number', async () => {
    mockPrismaService.competitor.findMany.mockResolvedValue([]);
    const result = await controller.findAll('1');
    expect(prisma.competitor.findMany).toHaveBeenCalledWith({
      where: { categoryId: 1 },
      include: { category: true, days: { include: { day: true } } },
    });
    expect(result).toEqual([]);
  });

  it('should call findOne with correct id', async () => {
    mockPrismaService.competitor.findUnique.mockResolvedValue({ id: 1 });
    const result = await controller.findOne(1);
    expect(prisma.competitor.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { category: true, days: { include: { day: true } } },
    });
    expect(result).toEqual({ id: 1 });
  });
});
