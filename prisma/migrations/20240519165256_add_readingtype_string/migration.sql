/*
  Warnings:

  - You are about to drop the column `sensorDataId` on the `Reading` table. All the data in the column will be lost.
  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SensorData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SensorType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `metadataId` to the `Reading` table without a default value. This is not possible if the table is not empty.
  - Made the column `timestamp_utc` on table `Reading` required. This step will fail if there are existing NULL values in that column.
  - Made the column `datetime` on table `Reading` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tz_offset` on table `Reading` required. This step will fail if there are existing NULL values in that column.
  - Made the column `value` on table `Reading` required. This step will fail if there are existing NULL values in that column.
  - Made the column `precision` on table `Reading` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mrid` on table `Reading` required. This step will fail if there are existing NULL values in that column.
  - Made the column `error_flag` on table `Reading` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Reading" DROP CONSTRAINT "Reading_sensorDataId_fkey";

-- DropForeignKey
ALTER TABLE "SensorData" DROP CONSTRAINT "SensorData_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "SensorData" DROP CONSTRAINT "SensorData_sensorTypeId_fkey";

-- AlterTable
ALTER TABLE "Reading" DROP COLUMN "sensorDataId",
ADD COLUMN     "metadataId" INTEGER NOT NULL,
ALTER COLUMN "timestamp_utc" SET NOT NULL,
ALTER COLUMN "datetime" SET NOT NULL,
ALTER COLUMN "tz_offset" SET NOT NULL,
ALTER COLUMN "value" SET NOT NULL,
ALTER COLUMN "precision" SET NOT NULL,
ALTER COLUMN "mrid" SET NOT NULL,
ALTER COLUMN "error_flag" SET NOT NULL;

-- DropTable
DROP TABLE "Device";

-- DropTable
DROP TABLE "SensorData";

-- DropTable
DROP TABLE "SensorType";

-- CreateTable
CREATE TABLE "Metadata" (
    "id" SERIAL NOT NULL,
    "readingType" TEXT NOT NULL,
    "device_sn" TEXT NOT NULL,
    "device_name" TEXT NOT NULL,
    "port_number" INTEGER NOT NULL,
    "sensor_sn" TEXT,
    "sensor_name" TEXT NOT NULL,
    "units" TEXT NOT NULL,
    "depth" TEXT NOT NULL,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LastSuccessfulFetch" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LastSuccessfulFetch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "Metadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
