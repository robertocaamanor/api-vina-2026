import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionsModule } from './competitions.module';
import { PrismaModule } from '../prisma/prisma.module';

describe('CompetitionsModule', () => {
    it('should compile the module', async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CompetitionsModule, PrismaModule],
        }).compile();

        expect(module).toBeDefined();
        expect(module.get(CompetitionsModule)).toBeInstanceOf(CompetitionsModule);
    });
});
