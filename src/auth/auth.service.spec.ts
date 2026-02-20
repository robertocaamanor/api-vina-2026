import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    process.env.API_USER = 'admin';
    process.env.API_PASSWORD = 'password';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    delete process.env.API_USER;
    delete process.env.API_PASSWORD;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return access token if credentials are valid', async () => {
    mockJwtService.sign.mockReturnValue('token');
    const result = await service.login('admin', 'password');
    expect(jwtService.sign).toHaveBeenCalledWith({ username: 'admin' });
    expect(result).toEqual({ access_token: 'token' });
  });

  it('should throw UnauthorizedException if credentials are invalid', async () => {
    await expect(service.login('admin', 'wrong_password')).rejects.toThrow(UnauthorizedException);
    await expect(service.login('wrong_user', 'password')).rejects.toThrow(UnauthorizedException);
  });
});
