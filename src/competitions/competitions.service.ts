import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompetitionsService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(categoryId?: number) {
        return this.prisma.competitor.findMany({
            where: categoryId ? { categoryId } : undefined,
            include: { category: true, days: { include: { day: true } } },
        });
    }

    findOne(id: number) {
        return this.prisma.competitor.findUnique({
            where: { id },
            include: { category: true, days: { include: { day: true } } },
        });
    }
}
