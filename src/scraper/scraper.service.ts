import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as cheerio from 'cheerio';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScraperService {
    private readonly logger = new Logger(ScraperService.name);

    constructor(private readonly prisma: PrismaService) { }

    @Cron('0 */2 * * * *')
    async handleCron() {
        this.logger.debug('Running Viña del Mar scraper para buscar gaviotas...');
        try {
            const response = await fetch('https://es.wikipedia.org/wiki/LXV_Festival_Internacional_de_la_Canci%C3%B3n_de_Vi%C3%B1a_del_Mar');
            const html = await response.text();
            const $ = cheerio.load(html);

            const tables = $('table.wikitable');

            const foundActs: { rowText: string; hasSilverSeagull: boolean; hasGoldSeagull: boolean }[] = [];

            tables.each((_, tableEl) => {
                const rows = $(tableEl).find('tr');

                rows.each((_, rowEl) => {
                    const cells = $(rowEl).find('td');

                    let hasSilverSeagull = false;
                    let hasGoldSeagull = false;

                    cells.each((_, cellEl) => {
                        const silver = $(cellEl).find("[style*='color:silver'], [style*='color: silver']").filter((_, elG) => $(elG).text().includes('G')).length > 0;
                        const gold = $(cellEl).find("[style*='color:gold'], [style*='color: gold']").filter((_, elG) => $(elG).text().includes('G')).length > 0;

                        if (silver) hasSilverSeagull = true;
                        if (gold) hasGoldSeagull = true;
                    });

                    const rowText = $(rowEl).text().toLowerCase();

                    if (hasSilverSeagull || hasGoldSeagull) {
                        foundActs.push({ rowText, hasSilverSeagull, hasGoldSeagull });
                    }
                });
            });

            const acts = await this.prisma.act.findMany();
            for (const act of acts) {
                let silver = act.hasSilverSeagull;
                let gold = act.hasGoldSeagull;
                let updated = false;

                for (const fAct of foundActs) {
                    // Check if the act's name is in the row text
                    if (fAct.rowText.includes(act.name.toLowerCase())) {
                        if (!silver && fAct.hasSilverSeagull) {
                            silver = true;
                            updated = true;
                        }
                        if (!gold && fAct.hasGoldSeagull) {
                            gold = true;
                            updated = true;
                        }
                    }
                }

                if (updated) {
                    await this.prisma.act.update({
                        where: { id: act.id },
                        data: {
                            hasSilverSeagull: silver,
                            hasGoldSeagull: gold,
                        }
                    });
                    this.logger.debug(`Updated Act ${act.name} with Seagulls { silver: ${silver}, gold: ${gold} }`);
                }
            }

        } catch (error) {
            this.logger.error('Error scraping Wikipedia', error);
        }
    }
}
