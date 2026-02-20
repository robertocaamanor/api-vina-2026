import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompetitionType } from '@prisma/client';

@Injectable()
export class CompetitionsService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(type?: CompetitionType) {
        return this.prisma.competition.findMany({
            where: type ? { type } : undefined,
            include: { day: true },
        });
    }

    findOne(id: number) {
        return this.prisma.competition.findUnique({
            where: { id },
            include: { day: true },
        });
    }
}
