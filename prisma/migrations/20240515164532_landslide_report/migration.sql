-- CreateEnum
CREATE TYPE "LandslideCategory" AS ENUM ('SoilCoverCollapse', 'RockFall');

-- CreateEnum
CREATE TYPE "Susceptibility" AS ENUM ('High', 'Medium', 'Low');

-- CreateTable
CREATE TABLE "Municipality" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barangay" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "municipalityId" INTEGER NOT NULL,

    CONSTRAINT "Barangay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandslideReport" (
    "id" SERIAL NOT NULL,
    "dateOfIncident" TIMESTAMP(3),
    "timeOfIncident" TIMESTAMP(3),
    "dateReported" TIMESTAMP(3),
    "municipalityId" INTEGER,
    "barangayId" INTEGER,
    "latitude" TEXT,
    "longitude" TEXT,
    "approvedBy" TEXT,
    "roadNetworks" TEXT,
    "builtUpAreas" TEXT,
    "displaced" INTEGER,
    "injured" INTEGER,
    "dead" INTEGER,
    "landslideCategory" "LandslideCategory",
    "triggeringMechanism" TEXT,
    "remarks" TEXT,
    "landslideSusceptibility" "Susceptibility",
    "floodingSusceptibility" "Susceptibility",
    "photo" TEXT,
    "actionsTaken" TEXT,

    CONSTRAINT "LandslideReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Barangay" ADD CONSTRAINT "Barangay_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandslideReport" ADD CONSTRAINT "LandslideReport_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandslideReport" ADD CONSTRAINT "LandslideReport_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE SET NULL ON UPDATE CASCADE;
