import { Test, TestingModule } from '@nestjs/testing';
import { DaysModule } from './days.module';
import { PrismaModule } from '../prisma/prisma.module';

describe('DaysModule', () => {
    it('should compile the module', async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DaysModule, PrismaModule],
        }).compile();

        expect(module).toBeDefined();
        expect(module.get(DaysModule)).toBeInstanceOf(DaysModule);
    });
});
