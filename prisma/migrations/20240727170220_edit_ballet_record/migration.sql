/*
  Warnings:

  - You are about to drop the column `authorId` on the `BalletRecord` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `BalletRecord` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `BalletRecord` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,userId]` on the table `BalletRecord` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `BalletRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `BalletRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BalletRecord" DROP CONSTRAINT "BalletRecord_authorId_fkey";

-- DropIndex
DROP INDEX "BalletRecord_month_day_authorId_key";

-- AlterTable
ALTER TABLE "BalletRecord" DROP COLUMN "authorId",
DROP COLUMN "day",
DROP COLUMN "month",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BalletRecord_date_userId_key" ON "BalletRecord"("date", "userId");

-- AddForeignKey
ALTER TABLE "BalletRecord" ADD CONSTRAINT "BalletRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
