import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

const testUserId = "6d2d8de0-693c-4860-a4e7-e71af5db0ae4";

export async function fetchUserProfile() {
  const user = await prisma.user.findUnique({
    where: {
      email: "aspyn_test@test.com",
    },
  });

  return user;
}

interface BalletRecords {
  id: string;
  date: Date;
  balletDone: boolean;
  userId: string;
}
[];

export interface BalletRecordResponse {
  balletRecords: BalletRecords[];
  startDate: string;
  endDate: string;
}

/**
 * DateTime 이슈: https://marklee1117.tistory.com/147
 * @param endDate: 'yyyy-MM-dd' 형식의 문자열
 */
export async function fetchBalletRecord(
  endDateString: string
): Promise<BalletRecordResponse> {
  const endDate = new Date(endDateString);
  const oneYearAgo = DateTime.fromJSDate(endDate)
    .startOf("day")
    .minus({ years: 1 });

  const records = await prisma.balletRecord.findMany({
    where: {
      AND: {
        userId: testUserId,
        date: {
          gt: oneYearAgo.toJSDate(),
          lte: endDate,
        },
      },
    },
  });

  return {
    balletRecords: records,
    startDate: oneYearAgo.plus({ days: 1 }).toFormat("yyyy-MM-dd"),
    endDate: endDateString,
  };
}

export async function updateBalletDone(date: string, balletDone: boolean) {
  const result = await prisma.balletRecord.upsert({
    where: {
      date_userId: {
        date: new Date(date),
        userId: testUserId,
      },
    },
    update: {
      balletDone,
    },
    create: {
      date: new Date(date),
      balletDone,
      userId: testUserId,
    },
  });

  return result;
}
