import { CompetitionsService } from './competitions.service';
import { CompetitionType } from '@prisma/client';
export declare class CompetitionsController {
    private readonly competitionsService;
    constructor(competitionsService: CompetitionsService);
    findAll(type?: CompetitionType): import("@prisma/client").Prisma.PrismaPromise<({
        day: {
            id: number;
            date: Date;
            name: string | null;
        };
    } & {
        id: number;
        type: import("@prisma/client").$Enums.CompetitionType;
        dayId: number;
        participant: string;
        song: string;
        country: string;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__CompetitionClient<({
        day: {
            id: number;
            date: Date;
            name: string | null;
        };
    } & {
        id: number;
        type: import("@prisma/client").$Enums.CompetitionType;
        dayId: number;
        participant: string;
        song: string;
        country: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
