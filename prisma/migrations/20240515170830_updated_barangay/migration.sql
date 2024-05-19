-- AlterTable
CREATE SEQUENCE barangay_id_seq;
ALTER TABLE "Barangay" ALTER COLUMN "id" SET DEFAULT nextval('barangay_id_seq');
ALTER SEQUENCE barangay_id_seq OWNED BY "Barangay"."id";
