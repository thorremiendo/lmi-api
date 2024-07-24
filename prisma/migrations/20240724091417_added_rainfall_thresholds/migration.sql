-- CreateTable
CREATE TABLE "RainFallThreshold" (
    "id" SERIAL NOT NULL,
    "observationPeriod" INTEGER NOT NULL,
    "ra0Min" INTEGER NOT NULL,
    "ra0Max" INTEGER NOT NULL,
    "ra1Min" INTEGER NOT NULL,
    "ra1Max" INTEGER NOT NULL,
    "ra2Min" INTEGER NOT NULL,
    "ra2Max" INTEGER NOT NULL,
    "ra3Min" INTEGER NOT NULL,
    "ra3Max" INTEGER NOT NULL,

    CONSTRAINT "RainFallThreshold_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RainFallThreshold_observationPeriod_key" ON "RainFallThreshold"("observationPeriod");
