import { PrismaService } from '../prisma/prisma.service';
import { ActType } from '@prisma/client';
export declare class ActsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(type?: ActType): import("@prisma/client").Prisma.PrismaPromise<({
        day: {
            date: Date;
            name: string | null;
            id: number;
        };
    } & {
        name: string;
        id: number;
        type: import("@prisma/client").$Enums.ActType;
        hasSilverSeagull: boolean;
        hasGoldSeagull: boolean;
        dayId: number;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__ActClient<({
        day: {
            date: Date;
            name: string | null;
            id: number;
        };
    } & {
        name: string;
        id: number;
        type: import("@prisma/client").$Enums.ActType;
        hasSilverSeagull: boolean;
        hasGoldSeagull: boolean;
        dayId: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
