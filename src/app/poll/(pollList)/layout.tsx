'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {useSelectedLayoutSegments} from 'next/navigation';
import pollImage from '../../../../public/polling.png';

const ActiveClass = 'border-b-[3px] border-buttonColor';

export default function PollListLayout({children}: {children: React.ReactNode}) {
  const currentPath = useSelectedLayoutSegments();

  return (
    <>
      <section className="pt-[8px] px-2">
        {/* 설문 조사 타이틀 */}
        <div className="w-full flex items-end ml-[4px]">
          <Image src={pollImage} alt="설문 조사" width="45" height="45" />
          <h1 className="pl-[8px] text-lg">설문조사</h1>
        </div>
        {/* 탭 바 */}
        <div className="w-full mt-[8px] text-sm">
          <Link href="/poll" className={clsx(currentPath.length === 0 && ActiveClass)}>
            Current
          </Link>
          <Link className={clsx('ml-[4px]', currentPath?.[0] === 'past' && ActiveClass)} href="/poll/past">
            Past
          </Link>
        </div>
      </section>
      {children}
    </>
  );
}
