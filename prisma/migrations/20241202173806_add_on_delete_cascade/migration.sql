-- DropForeignKey
ALTER TABLE "BalletPost" DROP CONSTRAINT "BalletPost_author_id_fkey";

-- DropForeignKey
ALTER TABLE "BalletPostCategory" DROP CONSTRAINT "BalletPostCategory_user_id_fkey";

-- AddForeignKey
ALTER TABLE "BalletPost" ADD CONSTRAINT "BalletPost_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletPostCategory" ADD CONSTRAINT "BalletPostCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
