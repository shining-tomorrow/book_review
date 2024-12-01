import {DateTime} from 'luxon';
import {useMemo} from 'react';

interface Props {
  feed: {
    id: number;
    title: string;
    description: string;
    date: string;
    category: string;
    views: number;
    image?: string;
  };
  dateFormat?:
    | {
        isISO: true;
      }
    | {
        isISO: false;
        format?: string;
      };
}

export default function Feed({feed, dateFormat = {isISO: false}}: Props) {
  const defaultFormat = 'yyyy-MM-dd';

  const parsedDescription = useMemo(() => feed.description.replace(/\n/g, ''), [feed.description]);
  const parsedDate = useMemo(() => {
    const today = DateTime.local();
    const dateTime = dateFormat.isISO
      ? DateTime.fromISO(feed.date)
      : DateTime.fromFormat(feed.date, dateFormat.format ?? defaultFormat);
    const diff = today.diff(dateTime);

    if (diff.as('second') < 60) {
      return `${diff.as('second').toFixed()}초 전`;
    }

    if (diff.as('minute') < 60) {
      return `${diff.as('minute').toFixed()}분 전`;
    }

    if (diff.as('hour') < 24) {
      return `${diff.as('hour').toFixed()}시간 전`;
    }

    if (diff.as('day') < 7) {
      return `${diff.as('day').toFixed()}일 전`;
    }

    if (diff.as('day') <= 31) {
      return `${diff.as('week').toFixed()}주 전`;
    }

    if (diff.as('month') < 12) {
      return `${diff.as('month').toFixed()}달 전`;
    }

    return `${diff.as('year').toFixed()}년 전`;
  }, [feed.date]);

  return (
    <div className="p-2 flex flex-col gap-3 shadow rounded-xl">
      <div className="bg-gray-100 py-1 px-2 rounded-full w-fit text-gray-500 text-sm">{feed.category}</div>
      <div className="flex flex-col gap-1">
        <h1 className="text-base font-semibold text-black">{feed.title}</h1>
        <p className="text-gray-500 text-sm">
          {parsedDescription.slice(0, 50)}
          {parsedDescription.length > 50 && '...'}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <time className="text-gray-500 text-sm">{parsedDate}</time>
        <span className="text-gray-500 text-sm">·</span>
        <span className="text-gray-500 text-sm">조회 {feed.views.toLocaleString()}</span>
      </div>
    </div>
  );
}
