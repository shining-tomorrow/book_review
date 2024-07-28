import React from "react";
import { RecordState } from "./ballet-record";
import TodayBalletButton from "./today-ballet-button";

const DATE_DISPLAY_FORMAT = "yyyy.MM.dd. EEEE";

const DailySummary = ({ record }: { record: RecordState }) => {
  return (
    <div>
      <div>{record.date.toFormat(DATE_DISPLAY_FORMAT)}</div>
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
