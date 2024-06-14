/*
  Warnings:

  - You are about to drop the `LastSuccessfulFetch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LastSuccessfulFetch";

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "deviceName" TEXT NOT NULL,
    "lastFetchDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);
