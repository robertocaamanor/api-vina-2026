import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Competitions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('competitions')
export class CompetitionsController {
    constructor(private readonly competitionsService: CompetitionsService) { }

    @Get()
    findAll(@Query('type') type?: CompetitionType) {
        return this.competitionsService.findAll(type);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.competitionsService.findOne(id);
    }
}
