import { CompetitionsService } from './competitions.service';
import { CompetitionType } from '@prisma/client';
export declare class CompetitionsController {
    private readonly competitionsService;
    constructor(competitionsService: CompetitionsService);
    findAll(type?: CompetitionType): import("@prisma/client").Prisma.PrismaPromise<({
        day: {
            id: number;
            name: string | null;
            date: Date;
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
            id: number;
            name: string | null;
            date: Date;
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
