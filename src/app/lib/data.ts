import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

const testUserId = "51c9aed2-fae2-4fcc-b1f9-21e026f49f06";

export async function fetchUserProfile() {
  const user = await prisma.user.findUnique({
    where: {
      email: "aspyn_test@test.com",
    },
  });

  return user;
}

export async function fetchExerciseRecord() {
  const oneYearAgo = DateTime.local().minus({ years: 1 }).toJSDate();

  const records = await prisma.balletRecord.findMany({
    where: {
      AND: {
        userId: testUserId,
        date: { gt: oneYearAgo },
      },
    },
  });

  return records;
}
