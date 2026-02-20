import { Test, TestingModule } from '@nestjs/testing';
import { ActsModule } from './acts.module';
import { PrismaModule } from '../prisma/prisma.module';

describe('ActsModule', () => {
    it('should compile the module', async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ActsModule, PrismaModule],
        }).compile();

        expect(module).toBeDefined();
        expect(module.get(ActsModule)).toBeInstanceOf(ActsModule);
    });
});
