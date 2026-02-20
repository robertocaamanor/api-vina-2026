import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DaysModule } from './days/days.module';
import { ActsModule } from './acts/acts.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, DaysModule, ActsModule, CompetitionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
