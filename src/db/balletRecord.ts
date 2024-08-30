import {DateTime} from 'luxon';
import {prisma} from './client';

export interface BalletRecordItem {
  id: string;
  date: Date;
  balletDone: boolean;
  userId: string;
}

export interface BalletRecordResponse {
  balletRecords: BalletRecordItem[];
  startDate: string;
  endDate: string;
}

/**
 * DateTime 이슈: https://marklee1117.tistory.com/147
 * @param endDate: 'yyyy-MM-dd' 형식의 문자열
 */
export async function fetchBalletRecord(endDateString: string): Promise<BalletRecordResponse> {
  const endDate = new Date(endDateString);
  const oneYearAgo = DateTime.fromJSDate(endDate).startOf('day').minus({years: 1});

  const records = await prisma.balletRecord.findMany({
    where: {
      AND: {
        userId: process.env.TEST_USER_ID,
        date: {
          gt: oneYearAgo.toJSDate(),
          lte: endDate,
        },
      },
    },
  });

  return {
    balletRecords: records,
    startDate: oneYearAgo.plus({days: 1}).toFormat('yyyy-MM-dd'),
    endDate: endDateString,
  };
}

export async function updateBalletDone(date: string, balletDone: boolean) {
  const result = await prisma.balletRecord.upsert({
    where: {
      date_userId: {
        date: new Date(date),
        userId: process.env.TEST_USER_ID ?? '',
      },
    },
    update: {
      balletDone,
    },
    create: {
      date: new Date(date),
      balletDone,
      userId: process.env.TEST_USER_ID ?? '',
    },
  });

  return result;
}