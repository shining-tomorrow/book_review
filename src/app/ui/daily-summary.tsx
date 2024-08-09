import React from "react";
import BalletDayCheck from "./ballet-day-check";
import { RecordState } from "./ballet-record";

const DATE_DISPLAY_FORMAT = "yyyy.MM.dd. EEEE";

const DailySummary = ({
  record,
  onUpdate,
}: {
  record: RecordState;
  onUpdate: Function;
}) => {
  return (
    <div>
      <div>{record.date.toFormat(DATE_DISPLAY_FORMAT)}</div>
      <BalletDayCheck record={record} onUpdate={onUpdate} />
    </div>
  );
};

export default DailySummary;
