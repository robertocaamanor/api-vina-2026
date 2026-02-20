import { PrismaService } from '../prisma/prisma.service';
export declare class DaysService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        acts: {
            id: number;
            name: string;
            type: import("@prisma/client").$Enums.ActType;
            hasSilverSeagull: boolean;
            hasGoldSeagull: boolean;
            dayId: number;
        }[];
        competitions: {
            id: number;
            type: import("@prisma/client").$Enums.CompetitionType;
            dayId: number;
            participant: string;
            song: string;
            country: string;
        }[];
    } & {
        id: number;
        date: Date;
        name: string | null;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__DayClient<({
        acts: {
            id: number;
            name: string;
            type: import("@prisma/client").$Enums.ActType;
            hasSilverSeagull: boolean;
            hasGoldSeagull: boolean;
            dayId: number;
        }[];
        competitions: {
            id: number;
            type: import("@prisma/client").$Enums.CompetitionType;
            dayId: number;
            participant: string;
            song: string;
            country: string;
        }[];
    } & {
        id: number;
        date: Date;
        name: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
