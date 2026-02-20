import { Test, TestingModule } from '@nestjs/testing';
import { ScraperModule } from './scraper.module';
import { ScraperService } from './scraper.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('ScraperModule', () => {
    it('should compile the module', async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ScraperModule, PrismaModule],
        }).compile();

        expect(module).toBeDefined();
        expect(module.get(ScraperService)).toBeInstanceOf(ScraperService);
    });
});
