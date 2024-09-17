'use client';

import {PollListItem} from '@/db/poll';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {FaCircleCheck} from 'react-icons/fa6';
import {IoIosArrowForward} from 'react-icons/io';
import {IoPeopleOutline} from 'react-icons/io5';
import {MdHowToVote} from 'react-icons/md';
import {NavBarHeight} from '../../../../const';

/**
 * TODO. db 구성하면 인터페이스 위치 바뀔 예정
 */
export interface PollItem {
  id: string;
  title: string;
  vote_count: number; // 몇 명이 투표에 참여했는지
  has_voted: boolean; // 유저가 투표에 참여했는지
  thumbnail_url: string | null; // 투표 만들 때 이미지 등록 안 했으면 디폴트 이미지 노출
}

const mockPollList: PollItem[] = Array.from({length: 10}, (_, i) => ({
  id: String(i),
  title:
    i % 2
      ? '최애 발레 슈즈 투표'
      : '여러분의 최애 발레 슈즈를 투표해주세요. 길게길게testesteststestetstsettetestestesteststestetstsettetes',
  vote_count: 3,
  has_voted: Boolean(i % 2),
  thumbnail_url:
    i % 2 === 0
      ? null
      : 'https://zjnkgnavmphkyf5n.public.blob.vercel-storage.com/nihal-demirci-erenay-UYG1U5wj3Tk-unsplash-RKVLJAGugUPwH0o5x4eWvNUCq2Q9PX.jpg',
}));

const Page = () => {
  const [pollList, setPollList] = useState<PollListItem[]>([]);
  const bottomPosition = NavBarHeight + 8;

  useEffect(() => {
    let ignore = false;
    fetch('/api/poll?isCurrent=true')
      .then(response => response.json())
      .then(response => {
        if (!ignore) {
          setPollList([...response, ...mockPollList]);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      {/* 설문 조사 리스트 */}
      <div className="flex flex-col">
        {pollList.map(({id, title, vote_count, has_voted, thumbnail_url}, idx) => (
          <Link
            href={'/poll/' + id}
            className={clsx('border-[1px] border-gray-200 p-4 rounded-[8px]', idx > 0 && 'mt-4')}
            key={id}
          >
            <div className="flex flex-row w-full items-center">
              <div className="w-[60px] h-[60px] overflow-hidden flex justify-center items-center rounded-full bg-[#e6e7e9]">
                {thumbnail_url ? (
                  <Image
                    src={thumbnail_url}
                    alt="투표 이미지"
                    width="60"
                    height="60"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <MdHowToVote className="w-[30px] h-auto" />
                )}
              </div>
              <div className="flex flex-col ml-[8px] max-w-[calc(100%-100px)]">
                <p className="text-[#0e141b] text-base overflow-hidden font-bold leading-tight mb-2 whitespace-nowrap text-ellipsis">
                  {title}
                </p>
                <div className="flex flex-row text-[#4e7397] text-sm font-normal leading-normal">
                  <div className="flex flex-row">
                    <IoPeopleOutline size="20" className="mr-[4px]" />
                    {vote_count}명 참여
                  </div>
                  {has_voted && (
                    <>
                      &nbsp;
                      <div>
                        <FaCircleCheck size="20" color="green" className="ml-[8px]" />
                        {has_voted}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="ml-auto">
                <IoIosArrowForward className="ml-[16px]" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* 투표 추가하기 버튼 */}
      <div style={{bottom: bottomPosition}} className={`fixed w-full h-[72px] p-[16px]`}>
        <button className="bg-buttonColor text-white">+ 투표 추가</button>
      </div>
    </div>
  );
};

export default Page;
