-- AlterTable
ALTER TABLE "LandslideReport" ADD COLUMN     "actionsTaken" INTEGER,
ADD COLUMN     "builtUpAreas" TEXT,
ADD COLUMN     "category" INTEGER,
ADD COLUMN     "dead" INTEGER,
ADD COLUMN     "displaced" INTEGER,
ADD COLUMN     "floodingSusceptibility" INTEGER,
ADD COLUMN     "injured" INTEGER,
ADD COLUMN     "landslideSusceptibility" INTEGER,
ADD COLUMN     "triggerMechanism" TEXT;
