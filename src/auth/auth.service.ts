import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(body: LoginRequest) {
    const username = body?.username;
    const password = body?.password;

    const expectedUsername = process.env.API_USER ?? 'admin';
    const expectedPassword = process.env.API_PASSWORD ?? 'admin';

    if (username !== expectedUsername || password !== expectedPassword) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: username, username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      token_type: 'Bearer',
      expires_in: 3600,
    };
  }
}
