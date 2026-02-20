import { PrismaClient, ActType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Viña 2026 data...');

    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Day", "Act", "CompetitionCategory", "Competitor", "DayCompetitor" RESTART IDENTITY CASCADE;`);

    // Crear categorías de competencia
    const catInt = await prisma.competitionCategory.create({ data: { name: 'INTERNATIONAL' } });
    const catFolk = await prisma.competitionCategory.create({ data: { name: 'FOLKLORIC' } });

    const intCompetitorsRaw = [
        { country: 'Chile', song: 'El Ciclo', participant: 'Son del Valle' },
        { country: 'España', song: 'Me Prometo', participant: 'Antoñito Molina' },
        { country: 'Italia', song: 'Grazie A(d)dio', participant: 'Chiara Grispo' },
        { country: 'México', song: 'Ruta Correcta', participant: 'TREX' },
        { country: 'República Dominicana', song: 'Call on Me', participant: 'Johnny Sky' },
        { country: 'Estonia', song: 'Ready To Go', participant: 'Vanilla Ninja' },
    ];

    const folkCompetitorsRaw = [
        { country: 'Argentina', song: 'La Zamba', participant: 'Campedrinos' },
        { country: 'Chile', song: 'Valoración', participant: 'A los 4 Vientos' },
        { country: 'Colombia', song: 'Los Herederos', participant: 'Rebolú' },
        { country: 'Ecuador', song: 'Capullito', participant: 'Brenda' },
        { country: 'España', song: 'Que vengan por mí', participant: 'María Peláe' },
        { country: 'México', song: 'Ningún color tiene dueño', participant: 'Majo Cornejo' },
    ];

    // Insertar cada competidor e indexarlo vía diccionario (clave: país_categoría) para enlazarlos después
    const competitorMap: Record<string, number> = {};

    for (const c of intCompetitorsRaw) {
        const comp = await prisma.competitor.create({
            data: { ...c, categoryId: catInt.id }
        });
        competitorMap[`${c.country}_INT`] = comp.id;
    }

    for (const c of folkCompetitorsRaw) {
        const comp = await prisma.competitor.create({
            data: { ...c, categoryId: catFolk.id }
        });
        competitorMap[`${c.country}_FOLK`] = comp.id;
    }

    // Días del festival
    const daysData = [
        {
            date: new Date('2026-02-22T00:00:00.000Z'),
            name: 'Domingo 22',
            acts: [
                { name: 'Gloria Estefan', type: ActType.ARTIST },
                { name: 'Stefan Kramer', type: ActType.HUMORIST },
                { name: 'Matteo Bocelli', type: ActType.ARTIST },
            ],
            comps: ['Chile_INT', 'España_INT', 'México_INT', 'Argentina_FOLK', 'España_FOLK', 'Ecuador_FOLK']
        },
        {
            date: new Date('2026-02-23T00:00:00.000Z'),
            name: 'Lunes 23',
            acts: [
                { name: 'Pet Shop Boys', type: ActType.ARTIST },
                { name: 'Edo Caroe', type: ActType.HUMORIST },
                { name: 'Sebastián Yatra', type: ActType.ARTIST },
            ],
            comps: ['Italia_INT', 'Estonia_INT', 'República Dominicana_INT', 'Chile_FOLK', 'México_FOLK', 'Colombia_FOLK']
        },
        {
            date: new Date('2026-02-24T00:00:00.000Z'),
            name: 'Martes 24',
            acts: [
                { name: 'Marco Antonio Solís', type: ActType.ARTIST },
                { name: 'Esteban Düch', type: ActType.HUMORIST },
                { name: 'NMIXX', type: ActType.ARTIST },
            ],
            comps: ['Chile_INT', 'España_INT', 'México_INT', 'Argentina_FOLK', 'España_FOLK', 'Ecuador_FOLK']
        },
        {
            date: new Date('2026-02-25T00:00:00.000Z'),
            name: 'Miércoles 25',
            acts: [
                { name: 'Juanes', type: ActType.ARTIST },
                { name: 'Asskha Sumathra', type: ActType.HUMORIST },
                { name: 'Ke Personajes', type: ActType.ARTIST },
            ],
            comps: ['Italia_INT', 'Estonia_INT', 'República Dominicana_INT', 'Chile_FOLK', 'México_FOLK', 'Colombia_FOLK']
        },
        {
            date: new Date('2026-02-26T00:00:00.000Z'),
            name: 'Jueves 26',
            acts: [
                { name: 'Mon Laferte', type: ActType.ARTIST },
                { name: 'Piare con P', type: ActType.HUMORIST },
                { name: 'Yandel Sinfónico', type: ActType.ARTIST },
            ],
            comps: []
        },
        {
            date: new Date('2026-02-27T00:00:00.000Z'),
            name: 'Viernes 27',
            acts: [
                { name: 'Paulo Londra', type: ActType.ARTIST },
                { name: 'Pablo Chill-E', type: ActType.ARTIST },
                { name: 'Pastor Rocha', type: ActType.HUMORIST },
                { name: 'Milo J', type: ActType.ARTIST },
            ],
            comps: []
        },
    ];

    for (const day of daysData) {
        const createdDay = await prisma.day.create({
            data: {
                date: day.date,
                name: day.name,
                acts: {
                    create: day.acts.map(act => ({
                        name: act.name,
                        type: act.type,
                        hasSilverSeagull: false,
                        hasGoldSeagull: false,
                    }))
                },
                competitors: {
                    create: day.comps.map(compKey => ({
                        competitorId: competitorMap[compKey]
                    }))
                }
            }
        });

        console.log(`Created day: ${createdDay.name}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
