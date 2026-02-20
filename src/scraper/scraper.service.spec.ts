import { Test, TestingModule } from '@nestjs/testing';
import { ScraperService } from './scraper.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ScraperService', () => {
    let service: ScraperService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const mockPrismaService = {
            act: {
                findMany: jest.fn(),
                update: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ScraperService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        service = module.get<ScraperService>(ScraperService);
        prisma = module.get<PrismaService>(PrismaService);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve(`
          <table class="wikitable">
            <tr>
              <td>Acto Falso</td>
              <td><b style="color:silver">G</b><span style="color:gold">G</span></td>
            </tr>
          </table>
        `),
            })
        ) as jest.Mock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should scrape correctly and update acts', async () => {
        (prisma.act.findMany as jest.Mock).mockResolvedValue([
            { id: 1, name: 'Acto Falso', hasSilverSeagull: false, hasGoldSeagull: false },
            { id: 2, name: 'Acto Falso Dos', hasSilverSeagull: false, hasGoldSeagull: false }, // no rows map to this
        ]);

        await service.handleCron();

        expect(global.fetch).toHaveBeenCalled();
        expect(prisma.act.findMany).toHaveBeenCalled();
        expect(prisma.act.update).toHaveBeenCalledTimes(1);
        expect(prisma.act.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: {
                hasSilverSeagull: true,
                hasGoldSeagull: true,
            }
        });
    });

    it('should not update acts when no seagulls are found', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve(`
          <table class="wikitable">
            <tr>
              <td>Acto Falso</td>
              <td>No flags here</td>
            </tr>
          </table>
        `),
            })
        ) as jest.Mock;

        (prisma.act.findMany as jest.Mock).mockResolvedValue([
            { id: 1, name: 'Acto Falso', hasSilverSeagull: false, hasGoldSeagull: false },
        ]);

        await service.handleCron();

        expect(prisma.act.update).not.toHaveBeenCalled();
    });

    it('should handle fetch errors gracefully', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

        await expect(service.handleCron()).resolves.toBeUndefined();
        expect(prisma.act.findMany).not.toHaveBeenCalled();
    });
});
