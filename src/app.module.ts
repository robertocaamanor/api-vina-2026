import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DaysModule } from './days/days.module';
import { ActsModule } from './acts/acts.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { AuthModule } from './auth/auth.module';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    DaysModule,
    ActsModule,
    CompetitionsModule,
    AuthModule,
    ScraperModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
