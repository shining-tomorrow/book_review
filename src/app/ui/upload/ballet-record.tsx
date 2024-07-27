"use client";

import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";
import React, { useState } from "react";
import DailySummary from "../daily-summary";

const DATE_DISPLAY_FORMAT = "yyyy.MM.dd. EEEE";

const BalletRecord = ({
  records,
}: {
  records: Prisma.BalletRecordCreateWithoutUserInput[];
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
      <div className="max-w-full grid grid-rows-7 grid-flow-col overflow:scroll md:gap-2 py-8 md:grid-cols-[repeat(auto-fit,minmax(0px,1fr))]">
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
              className={`border-[0.5px] p-2 cursor-pointer ${addedClass}`}
              onClick={() => handleClick(date)}
            ></div>
          );
        })}
      </div>
      <DailySummary record={record} />
    </>
  );
};

export default BalletRecord;
