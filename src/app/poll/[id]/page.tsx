'use client';

import {DetailPollItem, OptionItem} from '@/db/poll';
import PollResult from '@/ui/poll/PollResult';
import PollView from '@/ui/poll/PollView';
import {useSession} from 'next-auth/react';
import {useParams, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

const MockPollItem: DetailPollItem = {
  author_id: 'test-user-id', // 유저의 다른 투표를 보거나 다른 작업을 보여줄 때 사용
  author_nickname: 'test-user-nickname',
  id: '1',
  title: '최애 발레 슈즈 투표',
  vote_count: 9,
  thumbnail_url:
    'https://zjnkgnavmphkyf5n.public.blob.vercel-storage.com/nihal-demirci-erenay-UYG1U5wj3Tk-unsplash-RKVLJAGugUPwH0o5x4eWvNUCq2Q9PX.jpg',
  description:
    '취미 발레 하시는 분들은 어떤 슈즈 많이 신으세요?<br>가격대도 다양하고, 처음이라 어떤 슈즈를 사야할지 모르겠어요😢',
  created_at: '2024-09-15 00:00:00', // yyyy-MM-dd HH:mm:ss
  updated_at: '2024-09-15 00:00:00', // yyyy-MM-dd HH:mm:ss
  end_date: null,
  allow_multiple: true,
  options: [
    {
      id: '0',
      content: '그리쉬코 바닥분리형 천슈즈 Model NO.10',
      vote_count: 0,
      has_voted: false,
    },
    {
      id: '1',
      content: '웨어무아 가죽슈즈 WM406',
      vote_count: 2,
      has_voted: false,
    },
    {
      id: '2',
      content: 'Degas 파리 오페라스쿨 발레슈즈',
      vote_count: 6,
      has_voted: false,
    },
    {
      id: '3',
      content: '웨어무아 베스타 vesta',
      vote_count: 5,
      has_voted: true,
    },
    {
      id: '4',
      content: '알롱제 Luzio 천슈즈',
      vote_count: 0,
      has_voted: false,
    },
    {
      id: '5',
      content: 'Capezio 2028W Juliet Canvas Shoes',
      vote_count: 6,
      has_voted: false,
    },
  ],
  comments: [],
};

const Page = () => {
  const router = useRouter();
  const {id: pollId} = useParams();
  const {data: session} = useSession();

  const [isResultView, setIsResultView] = useState(true);
  const [response, setResponse] = useState<DetailPollItem>();
  const [topOptions, setTopOptions] = useState<OptionItem[]>([]);

  const getPollDetail = () => {
    fetch('/api/poll/' + pollId)
      .then(response => response.json())
      .then(response => {
        /**
         * TODO. 목데이터 보여주는 부분 대신 에러 화면 보여주기
         */
        const value = response ?? MockPollItem;
        setResponse(value);
        const [first, ...otherOptions] = value.options;
        let _topOptions = [first];

        otherOptions.forEach((option: OptionItem) => {
          if (option.vote_count > _topOptions[0].vote_count) {
            _topOptions = [option];
          } else if (option.vote_count === _topOptions[0].vote_count) {
            _topOptions.push(option);
          }
        });

        setTopOptions(_topOptions);

        // 투표했는지 확인하기
        const hasVoted = value.options.some((option: OptionItem) => option.has_voted);
        setIsResultView(hasVoted);
      });
  };

  useEffect(() => {
    getPollDetail();
  }, [pollId]);

  const handleClickDelete = async () => {
    const response = await fetch('/api/poll/' + pollId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      alert('투표를 삭제했습니다.');

      router.push('/poll');

      return;
    }

    alert('투표 삭제가 실패했습니다.');
  };

  if (!response) {
    return null;
  }

  return (
    <div>
      <div className="pb-[8px] border-b-[2px] border-b-[lineColor]">
        <div className="my-[8px] text-lg">{response.title}</div>
        <div className="text-sm flex flex-col md:flex-row md:justify-between">
          <div>작성자: {response.author_nickname}</div>
          {/* end_date 타입 확인하기 */}
          <div>
            {response.end_date ? '마감 : ' + String(response.end_date) : '마감 없음'} |{' '}
            {response.allow_multiple ? '복수 선택' : '단일 선택'} | {response.vote_count}명 참여
          </div>
        </div>
      </div>

      {/* TODO. 수정, 삭제 버튼 추가하기 */}
      {response.author_id === (session as any)?.user?.id && (
        <div className="flex">
          <div className="ml-auto">
            <span>수정</span> | <button onClick={handleClickDelete}>삭제</button>
          </div>
        </div>
      )}

      {isResultView ? (
        <PollResult pollDetail={response} topOptions={topOptions} setIsResultView={setIsResultView} />
      ) : (
        <PollView
          id={response.id}
          options={response.options}
          setIsResultView={setIsResultView}
          getPollDetail={getPollDetail}
          isAllowMultipleChoice={response.allow_multiple}
        />
      )}
    </div>
  );
};

export default Page;
