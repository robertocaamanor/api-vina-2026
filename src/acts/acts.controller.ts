import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ActsService } from './acts.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Acts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('acts')
export class ActsController {
    constructor(private readonly actsService: ActsService) { }

    @ApiQuery({ name: 'categoryId', required: false, type: Number, description: '1 para ARTIST, 2 para HUMORIST' })
    @Get()
    findAll(@Query('categoryId') categoryId?: string) {
        return this.actsService.findAll(categoryId ? parseInt(categoryId) : undefined);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.actsService.findOne(id);
    }
}
