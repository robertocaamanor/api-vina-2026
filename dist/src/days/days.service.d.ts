import { PrismaService } from '../prisma/prisma.service';
export declare class DaysService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        acts: {
            name: string;
            id: number;
            type: import("@prisma/client").$Enums.ActType;
            hasSilverSeagull: boolean;
            hasGoldSeagull: boolean;
            dayId: number;
        }[];
        competitions: {
            id: number;
            type: import("@prisma/client").$Enums.CompetitionType;
            participant: string;
            song: string;
            country: string;
            dayId: number;
        }[];
    } & {
        date: Date;
        name: string | null;
        id: number;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__DayClient<({
        acts: {
            name: string;
            id: number;
            type: import("@prisma/client").$Enums.ActType;
            hasSilverSeagull: boolean;
            hasGoldSeagull: boolean;
            dayId: number;
        }[];
        competitions: {
            id: number;
            type: import("@prisma/client").$Enums.CompetitionType;
            participant: string;
            song: string;
            country: string;
            dayId: number;
        }[];
    } & {
        date: Date;
        name: string | null;
        id: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
