import { PrismaService } from '../prisma/prisma.service';
export declare class CompetitionsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(categoryId?: string): import("@prisma/client").Prisma.PrismaPromise<({
        category: {
            id: number;
            name: string;
        };
        days: ({
            day: {
                id: number;
                date: Date;
                name: string | null;
            };
        } & {
            id: number;
            dayId: number;
            competitorId: number;
        })[];
    } & {
        id: number;
        participant: string;
        song: string;
        country: string;
        categoryId: number;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__CompetitorClient<({
        category: {
            id: number;
            name: string;
        };
        days: ({
            day: {
                id: number;
                date: Date;
                name: string | null;
            };
        } & {
            id: number;
            dayId: number;
            competitorId: number;
        })[];
    } & {
        id: number;
        participant: string;
        song: string;
        country: string;
        categoryId: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
