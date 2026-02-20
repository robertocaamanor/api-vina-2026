import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DaysService {
    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        return this.prisma.day.findMany({
            include: { acts: true, competitors: { include: { competitor: { include: { category: true } } } } },
        });
    }

    findOne(id: number) {
        return this.prisma.day.findUnique({
            where: { id },
            include: { acts: true, competitors: { include: { competitor: { include: { category: true } } } } },
        });
    }
}
