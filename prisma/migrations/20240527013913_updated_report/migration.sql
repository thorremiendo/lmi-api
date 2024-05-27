/*
  Warnings:

  - You are about to drop the column `actionsTaken` on the `LandslideReport` table. All the data in the column will be lost.
  - You are about to drop the column `builtUpAreas` on the `LandslideReport` table. All the data in the column will be lost.
  - You are about to drop the column `dead` on the `LandslideReport` table. All the data in the column will be lost.
  - You are about to drop the column `displaced` on the `LandslideReport` table. All the data in the column will be lost.
  - You are about to drop the column `floodingSusceptibility` on the `LandslideReport` table. All the data in the column will be lost.
  - You are about to drop the column `injured` on the `LandslideReport` table. All the data in the column will be lost.
  - You are about to drop the column `landslideCategory` on the `LandslideReport` table. All the data in the column will be lost.
  - You are about to drop the column `landslideSusceptibility` on the `LandslideReport` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `LandslideReport` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `LandslideReport` table. All the data in the column will be lost.
  - You are about to drop the column `roadNetworks` on the `LandslideReport` table. All the data in the column will be lost.
  - You are about to drop the column `triggeringMechanism` on the `LandslideReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LandslideReport" DROP COLUMN "actionsTaken",
DROP COLUMN "builtUpAreas",
DROP COLUMN "dead",
DROP COLUMN "displaced",
DROP COLUMN "floodingSusceptibility",
DROP COLUMN "injured",
DROP COLUMN "landslideCategory",
DROP COLUMN "landslideSusceptibility",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "roadNetworks",
DROP COLUMN "triggeringMechanism",
ADD COLUMN     "status" INTEGER;

-- DropEnum
DROP TYPE "LandslideCategory";

-- DropEnum
DROP TYPE "Susceptibility";
