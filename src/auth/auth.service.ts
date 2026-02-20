import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async login(username: string, pass: string) {
        if (username === process.env.API_USER && pass === process.env.API_PASSWORD) {
            const payload = { username };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        throw new UnauthorizedException('Invalid credentials');
    }
}
