import {DateTime} from 'luxon';
import {prisma} from './client';

export interface BalletRecordItem {
  id: string;
  date: Date;
  ballet_done: boolean;
  user_id: string;
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
export async function fetchBalletRecord(endDateString: string, userId: string): Promise<BalletRecordResponse> {
  const endDate = new Date(endDateString);
  const oneYearAgo = DateTime.fromJSDate(endDate).startOf('day').minus({years: 1});

  const records = await prisma.balletRecord.findMany({
    where: {
      AND: {
        user_id: userId,
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

export async function updateBalletDone(date: string, ballet_done: boolean, userId: string) {
  const result = await prisma.balletRecord.upsert({
    where: {
      date_user_id: {
        date: new Date(date),
        user_id: userId,
      },
    },
    update: {
      ballet_done: ballet_done,
    },
    create: {
      date: new Date(date),
      ballet_done: ballet_done,
      user_id: userId,
    },
  });

  return result;
}
