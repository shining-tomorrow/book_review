/*
  Warnings:

  - You are about to drop the `BalletPostRecord` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `BalletPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BalletPostRecord" DROP CONSTRAINT "BalletPostRecord_ballet_post_id_fkey";

-- DropForeignKey
ALTER TABLE "BalletPostRecord" DROP CONSTRAINT "BalletPostRecord_ballet_record_id_fkey";

-- AlterTable
ALTER TABLE "BalletPost" ADD COLUMN     "category_id" UUID NOT NULL;

-- DropTable
DROP TABLE "BalletPostRecord";

-- CreateTable
CREATE TABLE "BalletPostCategory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "BalletPostCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalletPostTag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "BalletPostTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalletPostBalletPostTag" (
    "post_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "BalletPostBalletPostTag_pkey" PRIMARY KEY ("post_id","tag_id")
);

-- CreateTable
CREATE TABLE "BalletPostComment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT NOT NULL,
    "author_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "parent_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "BalletPostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalletPostReaction" (
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "reaction" "ReactionType" NOT NULL,

    CONSTRAINT "BalletPostReaction_pkey" PRIMARY KEY ("user_id","post_id")
);

-- CreateTable
CREATE TABLE "BalletPostCommentReaction" (
    "user_id" UUID NOT NULL,
    "comment_id" UUID NOT NULL,
    "reaction" "ReactionType" NOT NULL,

    CONSTRAINT "BalletPostCommentReaction_pkey" PRIMARY KEY ("user_id","comment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BalletPostCategory_name_key" ON "BalletPostCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BalletPostTag_name_key" ON "BalletPostTag"("name");

-- AddForeignKey
ALTER TABLE "BalletPost" ADD CONSTRAINT "BalletPost_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "BalletPostCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletPostBalletPostTag" ADD CONSTRAINT "BalletPostBalletPostTag_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "BalletPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletPostBalletPostTag" ADD CONSTRAINT "BalletPostBalletPostTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "BalletPostTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletPostComment" ADD CONSTRAINT "BalletPostComment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletPostComment" ADD CONSTRAINT "BalletPostComment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "BalletPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletPostComment" ADD CONSTRAINT "BalletPostComment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "BalletPostComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletPostReaction" ADD CONSTRAINT "BalletPostReaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletPostReaction" ADD CONSTRAINT "BalletPostReaction_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "BalletPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletPostCommentReaction" ADD CONSTRAINT "BalletPostCommentReaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletPostCommentReaction" ADD CONSTRAINT "BalletPostCommentReaction_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "BalletPostComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
