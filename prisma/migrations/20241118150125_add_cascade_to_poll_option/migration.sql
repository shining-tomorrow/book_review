-- DropForeignKey
ALTER TABLE "PollOption" DROP CONSTRAINT "PollOption_poll_id_fkey";

-- DropForeignKey
ALTER TABLE "UserVote" DROP CONSTRAINT "UserVote_poll_id_fkey";

-- AddForeignKey
ALTER TABLE "PollOption" ADD CONSTRAINT "PollOption_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVote" ADD CONSTRAINT "UserVote_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;
