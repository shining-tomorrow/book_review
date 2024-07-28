import React from "react";
import { RecordState } from "./ballet-record";
import TodayBalletButton from "./today-ballet-button";

const DailySummary = ({ record }: { record: RecordState }) => {
  return (
    <div>
      <div>{record.date}</div>
      {record.isToday ? (
        <TodayBalletButton balletDone={record.balletDone} />
      ) : record.balletDone ? (
        <span>발레 완료 🩰</span>
      ) : (
        <span>쉬었어요 😴</span>
      )}
    </div>
  );
};

export default DailySummary;
