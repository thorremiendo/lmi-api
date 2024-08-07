/* eslint-disable prettier/prettier */
// prisma/seed.ts

import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function main() {
    const users = [
        { username: 'lmis-mayor', email: 'lmis1@test.com', role: Role.LGU, firstName: 'Mayor', lastName: 'Mayor', contactNumber: '09123456789', municipalityId: null, barangayId: null },
        { username: 'lmis-barangay', email: 'lmis2@test.com', role: Role.LGU, firstName: 'Barangay', lastName: 'Barangay', contactNumber: '09123456789', municipalityId: null, barangayId: null },
        { username: 'lmis-drrmo', email: 'lmis3@test.com', role: Role.LGA, firstName: 'DRRMO', lastName: 'DRRMO', contactNumber: '09123456789', municipalityId: null, barangayId: null },
        { username: 'lmis-mgbcar', email: 'lmis4@test.com', role: Role.LGA, firstName: 'MGBCAR', lastName: 'MGBCAR', contactNumber: '09123456789', municipalityId: null, barangayId: null },
        { username: 'lmis-pagasa', email: 'lmis5@test.com', role: Role.LGA, firstName: 'PAGASA', lastName: 'PAGASA', contactNumber: '09123456789', municipalityId: null, barangayId: null },
        { username: 'lmis-community', email: 'lmis6@test.com', role: Role.Others, firstName: 'Community', lastName: 'Community', contactNumber: '09123456789', municipalityId: null, barangayId: null },
        { username: 'lmis-admin', email: 'lmis7@test.com', role: Role.Admin, firstName: 'Admin', lastName: 'Admin', contactNumber: '09123456789', municipalityId: null, barangayId: null },
    ];

    for (const user of users) {
        const existingUser = await prisma.user.findFirst({
            where: { username: user.username },
        });

        if (!existingUser) {
            await prisma.user.create({
                data: {
                    username: user.username,
                    password: await hashPassword('testpassword'),
                    email: user.email,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    contactNumber: user.contactNumber,
                    municipalityId: user.municipalityId,
                    barangayId: user.barangayId,
                },
            });
        }
    }

    const data = [
        {
            municipality: "Baguio City",
            barangays: [
                "A. BONIFACIO-CAGUIOA-RIMANDO (ABCR)",
                "ABANAO-ZANDUETA-KAYANG-CHUGUM-OTEK (AZKCO)",
                "ALFONSO TABORA",
                "AMBIONG",
                "ANDRES BONIFACIO (LOWER BOKAWKAN)",
                "APUGAN-LOAKAN",
                "ASIN ROAD",
                "ATOK TRAIL",
                "AURORA HILL PROPER (MALVAR-SGT. FLORESCA)",
                "AURORA HILL, NORTH CENTRAL",
                "AURORA HILL, SOUTH CENTRAL",
                "BAKAKENG CENTRAL",
                "BAKAKENG NORTH",
                "BAL-MARCOVILLE (MARCOVILLE)",
                "BALSIGAN",
                "BAYAN PARK EAST",
                "BAYAN PARK VILLAGE",
                "BAYAN PARK WEST (BAYAN PARK)",
                "BGH COMPOUND",
                "BROOKSIDE",
                "BROOKSPOINT",
                "CABINET HILL-TEACHER'S CAMP",
                "CAMDAS SUBDIVISION",
                "CAMP 7",
                "CAMP 8",
                "CAMP ALLEN",
                "CAMPO FILIPINO",
                "CITY CAMP CENTRAL",
                "CITY CAMP PROPER",
                "COUNTRY CLUB VILLAGE",
                "CRESENCIA VILLAGE",
                "DAGSIAN, LOWER",
                "DAGSIAN, UPPER",
                "DIZON SUBDIVISION",
                "DOMINICAN HILL-MIRADOR",
                "DONTOGAN",
                "DPS AREA",
                "ENGINEERS' HILL",
                "FAIRVIEW VILLAGE",
                "FERDINAND (HAPPY HOMES-CAMPO SIOCO)",
                "FORT DEL PILAR",
                "GABRIELA SILANG",
                "GENERAL EMILIO F. AGUINALDO (QUIRINO-MAGSAYSAY, LOWER)",
                "GENERAL LUNA, LOWER",
                "GENERAL LUNA, UPPER",
                "GIBRALTAR",
                "GREENWATER VILLAGE",
                "GUISAD CENTRAL",
                "GUISAD SORONG",
                "HAPPY HOLLOW",
                "HAPPY HOMES (HAPPY HOMES-LUCBAN)",
                "HARRISON-CLAUDIO CARANTES",
                "HILLSIDE",
                "HOLY GHOST EXTENSION",
                "HOLY GHOST PROPER",
                "HONEYMOON (HONEYMOON-HOLY GHOST)",
                "IMELDA R. MARCOS (LA SALLE)",
                "IMELDA VILLAGE",
                "IRISAN",
                "KABAYANIHAN",
                "KAGITINGAN",
                "KAYANG EXTENSION",
                "KAYANG-HILLTOP",
                "KIAS",
                "LEGARDA-BURNHAM-KISAD",
                "LIWANAG-LOAKAN",
                "LOAKAN PROPER",
                "LOPEZ JAENA",
                "LOURDES SUBDIVISION EXTENSION",
                "LOURDES SUBDIVISION, LOWER",
                "LOURDES SUBDIVISION, PROPER",
                "LUALHATI",
                "LUCNAB",
                "MAGSAYSAY PRIVATE ROAD",
                "MAGSAYSAY, LOWER",
                "MAGSAYSAY, UPPER",
                "MALCOLM SQUARE-PERFECTO (JOSE ABAD SANTOS)",
                "MANUEL A. ROXAS",
                "MARKET SUBDIVISION, UPPER",
                "MIDDLE QUEZON HILL SUBDIVISION(QUEZON HILL MIDDLE)",
                "MILITARY CUT-OFF",
                "MINES VIEW PARK",
                "MODERN SITE, EAST",
                "MODERN SITE, WEST",
                "MRR-QUEEN OF PEACE",
                "NEW LUCBAN",
                "OUTLOOK DRIVE",
                "PACDAL",
                "PADRE BURGOS",
                "PADRE ZAMORA",
                "PALMA-URBANO (CARIÑO-PALMA)",
                "PHIL-AM",
                "PINGET",
                "PINSAO PILOT PROJECT",
                "PINSAO PROPER",
                "POLIWES",
                "PUCSUSAN",
                "QUEZON HILL PROPER",
                "QUEZON HILL, UPPER",
                "QUIRINO HILL, EAST",
                "QUIRINO HILL, LOWER",
                "QUIRINO HILL, MIDDLE",
                "QUIRINO HILL, WEST",
                "QUIRINO-MAGSAYSAY, UPPER (UPPER QM)",
                "RIZAL MONUMENT AREA",
                "ROCK QUARRY, LOWER",
                "ROCK QUARRY, MIDDLE",
                "ROCK QUARRY, UPPER",
                "SAINT JOSEPH VILLAGE",
                "SALUD MITRA",
                "SAN ANTONIO VILLAGE",
                "SAN LUIS VILLAGE",
                "SAN ROQUE VILLAGE",
                "SAN VICENTE",
                "SANITARY CAMP, NORTH",
                "SANITARY CAMP, SOUTH",
                "SANTA ESCOLASTICA",
                "SANTO ROSARIO",
                "SANTO TOMAS PROPER",
                "SANTO TOMAS SCHOOL AREA",
                "SCOUT BARRIO",
                "SESSION ROAD AREA",
                "SLAUGHTER HOUSE AREA (SANTO NIÑO SLAUGHTER)",
                "SLU-SVP HOUSING VILLAGE",
                "SOUTH DRIVE",
                "TEODORA ALONZO",
                "TRANCOVILLE",
                "VICTORIA VILLAGE"
            ]
        },
        {
            municipality: "La Trinidad",
            barangays: [
                "ALAPANG",
                "ALNO",
                "AMBIONG",
                "BAHONG",
                "BALILI",
                "BECKEL",
                "BETAG",
                "BINENG",
                "CRUZ",
                "LUBAS",
                "PICO",
                "POBLACION",
                "PUGUIS",
                "SHILAN",
                "TAWANG",
                "WANGAL"
            ]
        },
        {
            municipality: "Itogon",
            barangays: [
                "AMPUCAO",
                "DALUPIRIP",
                "GUMATDANG",
                "LOACAN",
                "POBLACION (CENTRAL)",
                "TINONGDAN",
                "TUDING",
                "UCAB",
                "VIRAC"
            ]
        },
        {
            municipality: "Sablan",
            barangays: [
                "BAGONG",
                "BALLUAY",
                "BANANGAN",
                "BANENGBENG",
                "BAYABAS",
                "KAMOG",
                "PAPPA",
                "POBLACION"
            ]
        },
        {
            municipality: "Tuba",
            barangays: [
                "ANSAGAN",
                "CAMP 3",
                "CAMP 4",
                "CAMP ONE",
                "NANGALISAN",
                "POBLACION",
                "SAN PASCUAL",
                "TABAAN NORTE",
                "TABAAN SUR",
                "TADIANGAN",
                "TALOY NORTE",
                "TALOY SUR",
                "TWIN PEAKS"
            ]
        },
        {
            municipality: "Tublay",
            barangays: [
                "AMBASSADOR",
                "AMBONGDOLAN",
                "BA-AYAN",
                "BASIL",
                "CAPONGA (POB.)",
                "DACLAN",
                "TUBLAY CENTRAL",
                "TUEL"
            ]
        }
    ]
    const municipalities = ['Baguio City', 'La Trinidad', 'Itogon', 'Sablan', 'Tuba', 'Tublay'];

    for (const municipality of municipalities) {
        const municipalityData = data.find(m => m.municipality === municipality);

        if (municipalityData) {
            let createdMunicipality = await prisma.municipality.findFirst({
                where: { name: municipalityData.municipality },
            });

            if (!createdMunicipality) {
                createdMunicipality = await prisma.municipality.create({
                    data: { name: municipalityData.municipality },
                });
            }

            for (const barangay of municipalityData.barangays) {
                const existingBarangay = await prisma.barangay.findFirst({
                    where: {
                        name: barangay,
                        municipalityId: createdMunicipality.id
                    },
                });

                if (!existingBarangay) {
                    await prisma.barangay.create({
                        data: {
                            name: barangay,
                            Municipality: {
                                connect: {
                                    id: createdMunicipality.id,
                                },
                            },
                        },
                    });
                }
            }
        }
    }

    const devices = ['z6-25616', 'z6-25617', 'z6-25618', 'z6-25619', 'z6-25620', 'z6-25621']
    const defaultFetchDate = new Date(Date.UTC(2024, 0, 1)) // January 1, 2024 UTC

    for (const device of devices) {
        // Check if the device already exists
        const existingDevice = await prisma.device.findFirst({
            where: {
                deviceName: device,
            },
        })

        // If the device doesn't exist, create a new record
        if (!existingDevice) {
            await prisma.device.create({
                data: {
                    deviceName: device,
                    lastFetchDateTime: defaultFetchDate,
                },
            })
        }
    }

    const thresholds = [
        {
            observationPeriod: 1,
            ra0Min: 0,
            ra0Max: 202,
            ra1Min: 203,
            ra1Max: 404,
            ra2Min: 405,
            ra2Max: 606,
            ra3Min: 607,
            ra3Max: 9999, // Assuming no upper limit
        },
        {
            observationPeriod: 2,
            ra0Min: 0,
            ra0Max: 247,
            ra1Min: 248,
            ra1Max: 494,
            ra2Min: 495,
            ra2Max: 742,
            ra3Min: 743,
            ra3Max: 9999, // Assuming no upper limit
        },
        {
            observationPeriod: 3,
            ra0Min: 0,
            ra0Max: 278,
            ra1Min: 279,
            ra1Max: 556,
            ra2Min: 557,
            ra2Max: 834,
            ra3Min: 835,
            ra3Max: 9999, // Assuming no upper limit
        },
        {
            observationPeriod: 4,
            ra0Min: 0,
            ra0Max: 323,
            ra1Min: 324,
            ra1Max: 645,
            ra2Min: 646,
            ra2Max: 968,
            ra3Min: 969,
            ra3Max: 9999, // Assuming no upper limit
        },
    ];

    for (const threshold of thresholds) {
        await prisma.rainFallThreshold.create({
            data: threshold,
        });
    }
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });
