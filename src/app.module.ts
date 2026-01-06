import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { VinaController } from './vina/vina.controller';
import { VinaService } from './vina/vina.service';

@Module({
  imports: [AuthModule],
  controllers: [VinaController],
  providers: [
    VinaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
