-- CreateTable
CREATE TABLE "BalletPost" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "authorId" UUID NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "BalletPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalletRecord" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "balletDone" BOOLEAN NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "BalletRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalletPostRecord" (
    "balletPostId" UUID NOT NULL,
    "balletRecordId" UUID NOT NULL,

    CONSTRAINT "BalletPostRecord_pkey" PRIMARY KEY ("balletPostId","balletRecordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "BalletRecord_month_day_authorId_key" ON "BalletRecord"("month", "day", "authorId");

-- AddForeignKey
ALTER TABLE "BalletPost" ADD CONSTRAINT "BalletPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletRecord" ADD CONSTRAINT "BalletRecord_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletPostRecord" ADD CONSTRAINT "BalletPostRecord_balletPostId_fkey" FOREIGN KEY ("balletPostId") REFERENCES "BalletPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalletPostRecord" ADD CONSTRAINT "BalletPostRecord_balletRecordId_fkey" FOREIGN KEY ("balletRecordId") REFERENCES "BalletRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
