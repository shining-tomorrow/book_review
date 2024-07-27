import { Prisma } from "@prisma/client";
import React from "react";

const DailySummary = ({
  record,
}: {
  record: Prisma.BalletRecordCreateWithoutUserInput & { date: string };
}) => {
  return (
    <div>
      <div>{record.date}</div>
      {record.balletDone ? (
        <span>오늘 발레 완료 🩰</span>
      ) : (
        <span>오늘은 쉬었어요 😴</span>
      )}
    </div>
  );
};

export default DailySummary;
