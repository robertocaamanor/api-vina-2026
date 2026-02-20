import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { JwtModule } from '@nestjs/jwt';

describe('AuthModule', () => {
    it('should compile the module', async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AuthModule, JwtModule.register({ secret: 'test' })],
        }).compile();

        expect(module).toBeDefined();
        expect(module.get(AuthModule)).toBeInstanceOf(AuthModule);
    });
});
