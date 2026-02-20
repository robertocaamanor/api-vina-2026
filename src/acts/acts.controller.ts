import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ActsService } from './acts.service';
import { ActType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Acts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('acts')
export class ActsController {
    constructor(private readonly actsService: ActsService) { }

    @Get()
    findAll(@Query('type') type?: ActType) {
        return this.actsService.findAll(type);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.actsService.findOne(id);
    }
}
