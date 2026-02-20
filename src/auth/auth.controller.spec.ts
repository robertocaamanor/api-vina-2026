import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call login on auth service', async () => {
    const body = { username: 'testuser', password: 'testpassword' };
    mockAuthService.login.mockResolvedValue({ access_token: 'token' });
    const result = await controller.login(body);
    expect(service.login).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(result).toEqual({ access_token: 'token' });
  });
});
