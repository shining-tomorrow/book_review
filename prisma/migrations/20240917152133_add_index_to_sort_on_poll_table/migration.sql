/*
  Warnings:

  - A unique constraint covering the columns `[endDate,createdAt,authorId]` on the table `Poll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Poll_endDate_createdAt_authorId_key" ON "Poll"("endDate" DESC, "createdAt" DESC, "authorId");
