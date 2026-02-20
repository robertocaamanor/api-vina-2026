import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Competitions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('competitions')
export class CompetitionsController {
    constructor(private readonly prisma: PrismaService) { }

    @ApiQuery({ name: 'category', required: false, type: Number, description: '1 para Int, 2 para Folk' })
    @Get()
    findAll(@Query('category') categoryId?: string) {
        return this.prisma.competitor.findMany({
            where: categoryId ? { categoryId: parseInt(categoryId) } : undefined,
            include: { category: true, days: { include: { day: true } } }
        });
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.prisma.competitor.findUnique({
            where: { id },
            include: { category: true, days: { include: { day: true } } },
        });
    }
}
