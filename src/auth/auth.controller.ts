import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', default: 'admin' },
                password: { type: 'string', default: 'admin123' },
            },
        },
    })
    @Post('login')
    login(@Body() body: any) {
        return this.authService.login(body.username, body.password);
    }
}
