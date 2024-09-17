import {DetailPollItem, OptionItem} from '@/db/poll';
import {FaCircleCheck, FaCrown} from 'react-icons/fa6';
import ProgressBar from './ProgressBar';

const PollResult = ({
  pollDetail,
  topOptions,
  setIsResultView,
}: {
  pollDetail: DetailPollItem;
  topOptions: OptionItem[];
  setIsResultView: Function;
}) => {
  return (
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
        {pollDetail.options.map(option => {
          const isTopOption = topOptions.some(topOption => topOption.id === option.id);

          return (
            <div key={option.id} className="mt-[8px]">
              <div>{option.content}</div>
              <div className="flex mt-[4px]">
                <ProgressBar percentage={(option.vote_count / pollDetail.participant_count) * 100} />
                <span>&nbsp;{option.vote_count}표</span>
                {isTopOption && <FaCrown size="20" color="#ffb743" className="ml-[8px]" />}
                {option.has_voted && <FaCircleCheck size="20" color="green" className="ml-[8px]" />}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="flex justify-center items-center h-[45px] w-full md:w-[330px] rounded-[15px] border-[1px] border-lineColor my-[10px] cursor-pointer md:hover:scale-90 md:hover:bg-gray-100"
        onClick={() => setIsResultView(false)}
      >
        다시 투표하기
      </div>
    </div>
  );
};

export default PollResult;
