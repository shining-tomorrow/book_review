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

interface BalletRecords {
  id: string;
  date: Date;
  balletDone: boolean;
  userId: string;
}
[];

export interface BalletRecordResponse {
  balletRecords: BalletRecords[];
  startDate: Date;
  endDate: Date;
}

export async function fetchBalletRecord(): Promise<BalletRecordResponse> {
  const oneYearAgo = DateTime.now().startOf("day").minus({ years: 1 });
  const endDate = DateTime.now().endOf("day").toJSDate();

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
    startDate: oneYearAgo.plus({ days: 1 }).toJSDate(),
    endDate,
  };
}
