"use client";

import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";
import React, { useState } from "react";
import DailySummary from "../daily-summary";

const DATE_DISPLAY_FORMAT = "yyyy.MM.dd. EEEE";
const DEFAULT_BACKGROUND_COLOR_CLASS = "bg-[#ebedf0]";

const BalletRecord = ({
  records,
  startDate,
  endDate,
}: {
  records: Prisma.BalletRecordCreateWithoutUserInput[];
  startDate: Date;
  endDate: Date;
}) => {
  const recordsMap = new Map();

  records.forEach((record) => {
    const date = DateTime.fromJSDate(record.date as Date).toFormat(
      DATE_DISPLAY_FORMAT
    );
    recordsMap.set(date, record);
  });

  /**
   * TODO. 오늘 날짜의 record 값을 db에서 찾아 디폴트로 설정하기
   */
  const [record, setRecord] = useState<
    Prisma.BalletRecordCreateWithoutUserInput & { date: string }
  >({
    date: DateTime.now().toFormat(DATE_DISPLAY_FORMAT),
    balletDone: false,
  });

  const handleClick = (date: string) => {
    const target = recordsMap.get(date);

    setRecord({
      date,
      balletDone: target ? target.balletDone : false,
    });
  };

  return (
    <>
      <div className="max-w-full py-8">
        <div className="text-sm pb-2">
          {DateTime.fromJSDate(startDate).toFormat("yy.MM.dd")} ~{" "}
          {DateTime.fromJSDate(endDate).toFormat("yy.MM.dd")}
        </div>
        <div className="grid grid-rows-7 grid-flow-col rounded overflow-x-auto md:gap-1 md:grid-cols-[repeat(auto-fit,minmax(0px,1fr))]">
          {Array.from({ length: 365 }).map((_, i) => {
            const date = DateTime.now()
              .minus({ days: 365 - i })
              .toFormat(DATE_DISPLAY_FORMAT);

            let addedClass = "";

            /**
             * github: #0e4429, #006d32, #26a641, #39d353
             * TODO: 포스팅 개수에 따라서 색깔 점점 더 밝아지게 하기
             */
            if (recordsMap.has(date)) {
              addedClass = "bg-[#006d32]";
            }

            return (
              <div
                key={i}
                className={`border-[0.5px] p-2 cursor-pointer ${
                  addedClass || DEFAULT_BACKGROUND_COLOR_CLASS
                }`}
                onClick={() => handleClick(date)}
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
