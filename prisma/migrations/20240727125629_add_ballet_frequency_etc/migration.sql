-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balletAcademy" VARCHAR(25),
ADD COLUMN     "balletSessionsPerWeek" INTEGER,
ADD COLUMN     "balletStartDate" TIMESTAMPTZ;
