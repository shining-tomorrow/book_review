"use client";

import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";
import React, { useState } from "react";
import DailySummary from "./daily-summary";

const DEFAULT_BACKGROUND_COLOR_CLASS = "bg-[#ebedf0]";
export const DATE_FORMAT = "yyyy-MM-dd";

export interface RecordState {
  date: DateTime;
  balletDone: boolean;
  isToday: boolean;
}

const BalletRecord = ({
  records,
  startDate,
  endDate,
}: {
  records: (Prisma.BalletRecordCreateWithoutUserInput & { date: Date })[];
  startDate: string;
  endDate: string;
}) => {
  const endDateTime = DateTime.fromFormat(endDate, DATE_FORMAT).startOf("day");
  const recordsMap = new Map<
    string,
    Prisma.BalletRecordCreateWithoutUserInput
  >();

  records.forEach((record) => {
    recordsMap.set(
      DateTime.fromJSDate(record.date).startOf("day").toFormat(DATE_FORMAT),
      record
    );
  });

  /**
   * TODO. 오늘 날짜의 record 값을 db에서 찾아 디폴트로 설정하기
   */
  const today = DateTime.now();
  const recordOfToday = recordsMap.get(today.toFormat(DATE_FORMAT));

  const [record, setRecord] = useState<RecordState>({
    date: today,
    balletDone: recordOfToday ? recordOfToday.balletDone : false,
    isToday: true,
  });

  const handleClick = (e: React.MouseEvent, date: DateTime) => {
    e.stopPropagation();

    const target = recordsMap.get(date.toFormat(DATE_FORMAT));

    setRecord({
      date,
      balletDone: target ? target.balletDone : false,
      isToday: DateTime.now().hasSame(date, "day"),
    });
  };

  return (
    <>
      <div className="max-w-full py-8">
        <div className="text-sm pb-2">
          {startDate} ~ {endDate}
        </div>
        <div className="grid grid-rows-7 grid-flow-col rounded overflow-x-auto md:gap-1 md:grid-cols-[repeat(auto-fit,minmax(0px,1fr))]">
          {Array.from({ length: 365 }).map((_, i) => {
            const date = endDateTime.minus({ days: 364 - i });

            let addedClass = "";
            /**
             * github: #0e4429, #006d32, #26a641, #39d353
             * TODO: 포스팅 개수에 따라서 색깔 점점 더 밝아지게 하기
             */
            if (recordsMap.has(date.toFormat(DATE_FORMAT))) {
              addedClass = "bg-[#006d32]";
            }

            return (
              <div
                key={i}
                className={`border-[0.5px] p-2 cursor-pointer ${
                  addedClass || DEFAULT_BACKGROUND_COLOR_CLASS
                }`}
                onClick={(e) => handleClick(e, date)}
              ></div>
            );
          })}
        </div>
      </div>
      <DailySummary record={record} />
    </>
  );
};

export default BalletRecord;
