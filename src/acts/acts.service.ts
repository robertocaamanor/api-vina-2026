import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActsService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(typeId?: number) {
        return this.prisma.act.findMany({
            where: typeId ? { typeId } : undefined,
            include: { day: true, type: true }
        });
    }

    findOne(id: number) {
        return this.prisma.act.findUnique({
            where: { id },
            include: { day: true, type: true },
        });
    }
}
