/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Poll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Poll_id_key" ON "Poll"("id");
