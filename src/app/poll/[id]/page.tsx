import ProgressBar from '@/ui/poll/ProgressBar';
import {FaCircleCheck, FaCrown} from 'react-icons/fa6';
import {PollItem} from '../page';

interface DetailPollItem extends Omit<PollItem, 'hasVoted'> {
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

interface OptionItem {
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

const page = () => {
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
      <div className="flex flex-col justify-items-center items-center mt-[10px]">
        <div className="flex flex-col justify-items-center items-center">
          <div className="bg-[#2ecc71] opacity-[0.87] px-[8px] py-[4px] my-[4px] rounded-[20px] w-fit">
            &nbsp;1위&nbsp;
          </div>
          {topOptions.map(option => {
            return <div key={option.id}>{option.content}</div>;
          })}
        </div>
        <div className="pt-[20px] mt-[10px] border-t-lineColor border-t-[1px]">
          {MockPollItem.options.map(option => {
            const isSelected = MockPollItem.selectedOptionIdList.some(id => id === option.id);
            const isTopOption = topOptions.some(topOption => topOption.id === option.id);

            return (
              <div key={option.id} className="mt-[8px]">
                <div>{option.content}</div>
                <div className="flex mt-[4px]">
                  <ProgressBar percentage={(option.voteCount / MockPollItem.participantCount) * 100} />
                  <span>&nbsp;{option.voteCount}표</span>
                  {isTopOption && <FaCrown size="20" color="#ffb743" className="ml-[8px]" />}
                  {isSelected && <FaCircleCheck size="20" color="green" className="ml-[8px]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
