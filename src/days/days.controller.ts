import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DaysService } from './days.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Days')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('days')
export class DaysController {
    constructor(private readonly daysService: DaysService) { }

    @Get()
    findAll() {
        return this.daysService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.daysService.findOne(id);
    }
}
