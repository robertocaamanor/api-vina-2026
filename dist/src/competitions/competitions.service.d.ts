import { PrismaService } from '../prisma/prisma.service';
import { CompetitionType } from '@prisma/client';
export declare class CompetitionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(type?: CompetitionType): import("@prisma/client").Prisma.PrismaPromise<({
        day: {
            date: Date;
            name: string | null;
            id: number;
        };
    } & {
        id: number;
        type: import("@prisma/client").$Enums.CompetitionType;
        participant: string;
        song: string;
        country: string;
        dayId: number;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__CompetitionClient<({
        day: {
            date: Date;
            name: string | null;
            id: number;
        };
    } & {
        id: number;
        type: import("@prisma/client").$Enums.CompetitionType;
        participant: string;
        song: string;
        country: string;
        dayId: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
