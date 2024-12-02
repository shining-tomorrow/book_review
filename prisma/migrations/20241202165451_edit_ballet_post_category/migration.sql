/*
  Warnings:

  - A unique constraint covering the columns `[user_id,name,color]` on the table `BalletPostCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `BalletPostCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `BalletPostCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `BalletPostCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BalletPostCategory" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BalletPostCategory_user_id_name_color_key" ON "BalletPostCategory"("user_id", "name", "color");

-- AddForeignKey
ALTER TABLE "BalletPostCategory" ADD CONSTRAINT "BalletPostCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
