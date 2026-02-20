import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    login(username: string, pass: string): Promise<{
        access_token: string;
    }>;
}
