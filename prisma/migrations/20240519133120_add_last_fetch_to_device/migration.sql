-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "last_successful_fetch" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
