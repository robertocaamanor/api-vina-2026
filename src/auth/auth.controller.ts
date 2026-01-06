import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { Public } from './public.decorator';
import { AuthService, LoginRequest } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'admin' },
        password: { type: 'string', example: 'admin' },
      },
      required: ['username', 'password'],
    },
  })
  login(@Body() body: LoginRequest) {
    return this.authService.login(body);
  }
}
