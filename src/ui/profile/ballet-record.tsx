'use client';

import {DateTime} from 'luxon';
import React, {useEffect, useState} from 'react';
import {BalletRecordItemForClient} from '../api/record/route';
import {BalletRecordResponse} from '../lib/data';
import DailySummary from './daily-summary';

const DEFAULT_BACKGROUND_COLOR_CLASS = 'bg-[#ebedf0]';
export const DATE_FORMAT = 'yyyy-MM-dd';

export interface RecordState {
  date: DateTime;
  ballet_done: boolean;
  isToday: boolean;
}

export interface ExtendedRecordResponse extends BalletRecordResponse {
  endDateTime: DateTime;
}

interface TotalState {
  response: ExtendedRecordResponse | null;
  recordsMap: Map<string, BalletRecordItemForClient>;
  record: RecordState;
}

const BalletRecord = () => {
  const [state, setState] = useState<TotalState>({
    response: null,
    recordsMap: new Map(),
    record: {
      date: DateTime.now(),
      ballet_done: false,
      isToday: true,
    },
  });

  const fetchData = async () => {
    const res = await fetch(`/api/record?date=${DateTime.now().toFormat('yyyy-MM-dd')}`);
    const balletRecordsResponse = await res.json();

    const newMap = new Map<string, BalletRecordItemForClient>();

    /**
     * * 서버에서 받을 때는 jsDate, 클라이언트에서 받을 때는 string
     */
    balletRecordsResponse.balletRecords.forEach((record: BalletRecordItemForClient) => {
      newMap.set(DateTime.fromISO(record.date).startOf('day').toFormat(DATE_FORMAT), record);
    });
    const selectedDateRecord = newMap.get(state.record.date.toFormat(DATE_FORMAT));

    setState({
      response: {
        ...balletRecordsResponse,
        endDateTime: DateTime.fromFormat(balletRecordsResponse.endDate, DATE_FORMAT).startOf('day'),
      },
      recordsMap: newMap,
      record: {
        ...state.record,
        ballet_done: selectedDateRecord ? selectedDateRecord.ballet_done : false,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (e: React.MouseEvent, date: DateTime) => {
    e.stopPropagation();

    const target = state.recordsMap.get(date.toFormat(DATE_FORMAT));

    setState({
      ...state,
      record: {
        date,
        ballet_done: target ? target.ballet_done : false,
        isToday: DateTime.now().hasSame(date, 'day'),
      },
    });
  };

  if (!state.response) {
    return null;
  }

  /**
   * TODO: Suspense, loading.js 추가하기
   */
  return (
    <>
      <div className="max-w-full py-8">
        <div className="text-sm pb-2">
          {state.response.startDate} ~ {state.response.endDate}
        </div>
        <div className="grid grid-rows-7 grid-flow-col rounded overflow-x-auto md:gap-1 md:grid-cols-[repeat(auto-fit,minmax(0px,1fr))]">
          {Array.from({length: 365}).map((_, i) => {
            const date = state.response!.endDateTime.minus({days: 364 - i});

            let addedClass = '';
            /**
             * github: #0e4429, #006d32, #26a641, #39d353
             * TODO: 포스팅 개수에 따라서 색깔 점점 더 밝아지게 하기
             */
            const hasBalletDone = state.recordsMap.get(date.toFormat(DATE_FORMAT))?.ballet_done ?? false;
            if (hasBalletDone) {
              addedClass = 'bg-[#006d32]';
            }

            return (
              <div
                key={i}
                className={`border-[0.5px] p-2 cursor-pointer ${addedClass || DEFAULT_BACKGROUND_COLOR_CLASS}`}
                onClick={e => handleClick(e, date)}
              ></div>
            );
          })}
        </div>
      </div>
      <DailySummary record={state.record} onUpdate={fetchData} />
    </>
  );
};

export default BalletRecord;
