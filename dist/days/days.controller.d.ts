import { DaysService } from './days.service';
export declare class DaysController {
    private readonly daysService;
    constructor(daysService: DaysService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        acts: {
            id: number;
            name: string;
            type: import("@prisma/client").$Enums.ActType;
            hasSilverSeagull: boolean;
            hasGoldSeagull: boolean;
            dayId: number;
        }[];
        competitors: ({
            competitor: {
                category: {
                    id: number;
                    name: string;
                };
            } & {
                id: number;
                participant: string;
                song: string;
                country: string;
                categoryId: number;
            };
        } & {
            id: number;
            dayId: number;
            competitorId: number;
        })[];
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
        competitors: ({
            competitor: {
                category: {
                    id: number;
                    name: string;
                };
            } & {
                id: number;
                participant: string;
                song: string;
                country: string;
                categoryId: number;
            };
        } & {
            id: number;
            dayId: number;
            competitorId: number;
        })[];
    } & {
        id: number;
        date: Date;
        name: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
