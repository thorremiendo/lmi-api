-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_barangayId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_municipalityId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "barangayId" DROP NOT NULL,
ALTER COLUMN "municipalityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE SET NULL ON UPDATE CASCADE;
