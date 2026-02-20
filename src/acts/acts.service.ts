import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActType } from '@prisma/client';

@Injectable()
export class ActsService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(type?: ActType) {
        return this.prisma.act.findMany({
            where: type ? { type } : undefined,
            include: { day: true }
        });
    }

    findOne(id: number) {
        return this.prisma.act.findUnique({
            where: { id },
            include: { day: true },
        });
    }
}
