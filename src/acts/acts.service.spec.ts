import { Test, TestingModule } from '@nestjs/testing';
import { ActsService } from './acts.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ActsService', () => {
  let service: ActsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    act: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ActsService>(ActsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findMany on findAll without parameter', async () => {
    mockPrismaService.act.findMany.mockResolvedValue([]);
    const result = await service.findAll();
    expect(prisma.act.findMany).toHaveBeenCalledWith({
      where: undefined,
      include: { day: true, type: true },
    });
    expect(result).toEqual([]);
  });

  it('should call findMany on findAll with typeId parameter', async () => {
    mockPrismaService.act.findMany.mockResolvedValue([]);
    const result = await service.findAll(1);
    expect(prisma.act.findMany).toHaveBeenCalledWith({
      where: { typeId: 1 },
      include: { day: true, type: true },
    });
    expect(result).toEqual([]);
  });

  it('should call findUnique on findOne', async () => {
    mockPrismaService.act.findUnique.mockResolvedValue({ id: 1 });
    const result = await service.findOne(1);
    expect(prisma.act.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { day: true, type: true },
    });
    expect(result).toEqual({ id: 1 });
  });
});
