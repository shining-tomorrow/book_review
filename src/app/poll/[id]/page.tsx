'use client';

import PollResult from '@/ui/poll/PollResult';
import PollView from '@/ui/poll/PollView';
import {useState} from 'react';
import {PollItem} from '../page';

const mockUserId = 'test-user-id';

export interface DetailPollItem extends Omit<PollItem, 'hasVoted'> {
  creator: {
    id: string; // 유저의 다른 투표를 보거나 다른 작업을 보여줄 때 사용
    nickname: string;
  };
  description: string;
  createdAt: string; // yyyy-MM-dd HH:mm:ss
  endDate: string | null; // 마감 없을 때 null
  allowMultiple: boolean; // 복수 선택 가능 여부
  options: OptionItem[];
  selectedOptionIdList: string[]; // 유저가 선택한 옵션 id, 비로그인 상태이거나 투표 전이라면 null
}

export interface OptionItem {
  id: string;
  content: string;
  voteCount: number;
}

const MockPollItem: DetailPollItem = {
  creator: {
    id: 'test-user-id', // 유저의 다른 투표를 보거나 다른 작업을 보여줄 때 사용
    nickname: 'test-user-nickname',
  },
  id: '1',
  title: '최애 발레 슈즈 투표',
  participantCount: 9,
  image:
    'https://zjnkgnavmphkyf5n.public.blob.vercel-storage.com/nihal-demirci-erenay-UYG1U5wj3Tk-unsplash-RKVLJAGugUPwH0o5x4eWvNUCq2Q9PX.jpg',
  description:
    '취미 발레 하시는 분들은 어떤 슈즈 많이 신으세요?<br>가격대도 다양하고, 처음이라 어떤 슈즈를 사야할지 모르겠어요😢',
  createdAt: '2024-09-15 00:00:00', // yyyy-MM-dd HH:mm:ss
  endDate: null,
  allowMultiple: true,
  options: [
    {
      id: '0',
      content: '그리쉬코 바닥분리형 천슈즈 Model NO.10',
      voteCount: 0,
    },
    {
      id: '1',
      content: '웨어무아 가죽슈즈 WM406',
      voteCount: 2,
    },
    {
      id: '2',
      content: 'Degas 파리 오페라스쿨 발레슈즈',
      voteCount: 6,
    },
    {
      id: '3',
      content: '웨어무아 베스타 vesta',
      voteCount: 5,
    },
    {
      id: '4',
      content: '알롱제 Luzio 천슈즈',
      voteCount: 0,
    },
    {
      id: '5',
      content: 'Capezio 2028W Juliet Canvas Shoes',
      voteCount: 6,
    },
  ],
  selectedOptionIdList: ['3'],
};

const Page = () => {
  const [isResultView, setIsResultView] = useState(true);

  let topOptions: OptionItem[] = [MockPollItem.options[0]];

  MockPollItem.options.forEach(option => {
    if (option.voteCount > topOptions[0].voteCount) {
      topOptions = [option];
    } else if (option.voteCount === topOptions[0].voteCount) {
      topOptions.push(option);
    }
  });

  return (
    <div>
      <div className="pb-[8px] border-b-[2px] border-b-[lineColor]">
        <div className="my-[8px] text-lg">{MockPollItem.title}</div>
        <div className="text-sm flex flex-col md:flex-row md:justify-between">
          <div>작성자: {MockPollItem.creator.nickname}</div>
          <div>
            {MockPollItem.endDate ?? '마감 없음'} | {MockPollItem.allowMultiple ? '복수 선택' : '단일 선택'} |{' '}
            {MockPollItem.participantCount}명 참여
          </div>
        </div>
      </div>

      {/* TODO. 수정, 삭제 버튼 추가하기 */}
      {isResultView && MockPollItem.creator.id === mockUserId && (
        <div className="flex">
          <div className="ml-auto">
            <span>수정</span> | <span>삭제</span>
          </div>
        </div>
      )}

      {isResultView ? (
        <PollResult pollDetail={MockPollItem} topOptions={topOptions} setIsResultView={setIsResultView} />
      ) : (
        <PollView id={MockPollItem.id} options={MockPollItem.options} />
      )}
    </div>
  );
};

export default Page;
