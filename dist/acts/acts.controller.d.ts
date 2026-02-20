import { ActsService } from './acts.service';
import { ActType } from '@prisma/client';
export declare class ActsController {
    private readonly actsService;
    constructor(actsService: ActsService);
    findAll(type?: ActType): import("@prisma/client").Prisma.PrismaPromise<({
        day: {
            id: number;
            date: Date;
            name: string | null;
        };
    } & {
        id: number;
        name: string;
        type: import("@prisma/client").$Enums.ActType;
        hasSilverSeagull: boolean;
        hasGoldSeagull: boolean;
        dayId: number;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__ActClient<({
        day: {
            id: number;
            date: Date;
            name: string | null;
        };
    } & {
        id: number;
        name: string;
        type: import("@prisma/client").$Enums.ActType;
        hasSilverSeagull: boolean;
        hasGoldSeagull: boolean;
        dayId: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
