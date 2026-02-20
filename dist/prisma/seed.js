"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding Viña 2026 data based on official Wikipedia schedule...');
    await prisma.competition.deleteMany({});
    await prisma.act.deleteMany({});
    await prisma.day.deleteMany({});
    const intCompetitors = {
        grupo1: [
            { country: 'Chile', song: 'El Ciclo', participant: 'Son del Valle' },
            { country: 'España', song: 'Me Prometo', participant: 'Antoñito Molina' },
            { country: 'México', song: 'Ruta Correcta', participant: 'TREX' },
        ],
        grupo2: [
            { country: 'Italia', song: 'Grazie A(d)dio', participant: 'Chiara Grispo' },
            { country: 'Estonia', song: 'Ready To Go', participant: 'Vanilla Ninja' },
            { country: 'República Dominicana', song: 'Call on Me', participant: 'Johnny Sky' },
        ]
    };
    const folkCompetitors = {
        grupo1: [
            { country: 'Argentina', song: 'La Zamba', participant: 'Campedrinos' },
            { country: 'España', song: 'Que vengan por mí', participant: 'María Peláe' },
            { country: 'Ecuador', song: 'Capullito', participant: 'Brenda' },
        ],
        grupo2: [
            { country: 'Chile', song: 'Valoración', participant: 'A los 4 Vientos' },
            { country: 'México', song: 'Ningún color tiene dueño', participant: 'Majo Cornejo' },
            { country: 'Colombia', song: 'Los Herederos', participant: 'Rebolú' },
        ]
    };
    const daysData = [
        {
            date: new Date('2026-02-22T00:00:00.000Z'),
            name: 'Domingo 22',
            acts: [
                { name: 'Gloria Estefan', type: client_1.ActType.ARTIST },
                { name: 'Stefan Kramer', type: client_1.ActType.HUMORIST },
                { name: 'Matteo Bocelli', type: client_1.ActType.ARTIST },
            ],
            international: intCompetitors.grupo1,
            folkloric: folkCompetitors.grupo1
        },
        {
            date: new Date('2026-02-23T00:00:00.000Z'),
            name: 'Lunes 23',
            acts: [
                { name: 'Pet Shop Boys', type: client_1.ActType.ARTIST },
                { name: 'Edo Caroe', type: client_1.ActType.HUMORIST },
                { name: 'Sebastián Yatra', type: client_1.ActType.ARTIST },
            ],
            international: intCompetitors.grupo2,
            folkloric: folkCompetitors.grupo2
        },
        {
            date: new Date('2026-02-24T00:00:00.000Z'),
            name: 'Martes 24',
            acts: [
                { name: 'Marco Antonio Solís', type: client_1.ActType.ARTIST },
                { name: 'Esteban Düch', type: client_1.ActType.HUMORIST },
                { name: 'NMIXX', type: client_1.ActType.ARTIST },
            ],
            international: intCompetitors.grupo1,
            folkloric: folkCompetitors.grupo1
        },
        {
            date: new Date('2026-02-25T00:00:00.000Z'),
            name: 'Miércoles 25',
            acts: [
                { name: 'Juanes', type: client_1.ActType.ARTIST },
                { name: 'Asskha Sumathra', type: client_1.ActType.HUMORIST },
                { name: 'Ke Personajes', type: client_1.ActType.ARTIST },
            ],
            international: intCompetitors.grupo2,
            folkloric: folkCompetitors.grupo2
        },
        {
            date: new Date('2026-02-26T00:00:00.000Z'),
            name: 'Jueves 26',
            acts: [
                { name: 'Mon Laferte', type: client_1.ActType.ARTIST },
                { name: 'Piare con P', type: client_1.ActType.HUMORIST },
                { name: 'Yandel Sinfónico', type: client_1.ActType.ARTIST },
            ],
            international: [],
            folkloric: []
        },
        {
            date: new Date('2026-02-27T00:00:00.000Z'),
            name: 'Viernes 27',
            acts: [
                { name: 'Paulo Londra', type: client_1.ActType.ARTIST },
                { name: 'Pablo Chill-E', type: client_1.ActType.ARTIST },
                { name: 'Pastor Rocha', type: client_1.ActType.HUMORIST },
                { name: 'Milo J', type: client_1.ActType.ARTIST },
            ],
            international: [],
            folkloric: []
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
                competitions: {
                    create: [
                        ...day.international.map(c => ({
                            type: client_1.CompetitionType.INTERNATIONAL,
                            country: c.country,
                            participant: c.participant,
                            song: c.song,
                        })),
                        ...day.folkloric.map(c => ({
                            type: client_1.CompetitionType.FOLKLORIC,
                            country: c.country,
                            participant: c.participant,
                            song: c.song,
                        }))
                    ]
                }
            }
        });
        console.log(`Created day: ${createdDay.name}`);
    }
    console.log('Seeding finished.');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map