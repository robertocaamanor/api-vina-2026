import { Module } from '@nestjs/common';

import { VinaController } from './vina/vina.controller';
import { VinaService } from './vina/vina.service';

@Module({
  controllers: [VinaController],
  providers: [VinaService],
})
export class AppModule {}
