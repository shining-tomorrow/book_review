import Image from 'next/image';
import {NavBarHeight} from '../../../const';
import pollImage from '../../../public/polling.png';

const mockFeedList = Array.from({length: 10}, (_, i) => ({
  id: i,
  title: '글 제목 글 제목 글 제목 글 제목 글 제목',
  description:
    '글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용',
  image: 'https://cdn.usegalileo.ai/stability/31bdc9b2-f116-4477-a8a5-db1689be29ed.png',
}));

const page = () => {
  const bottomPosition = NavBarHeight + 8;

  return (
    <div className="py-[16px] px-2">
      <div className="w-full flex items-end">
        <Image src={pollImage} alt="설문 조사" width="45" height="45" />
        <h1 className="pl-[8px] text-lg">설문조사</h1>
      </div>
      <div className="flex flex-col">
        {mockFeedList.map(({id, title, description, image}) => (
          <div className="flex gap-4 border-[1px] border-gray-200 p-4 mt-4 rounded-[8px]" key={id}>
            <div className="w-2/3 flex flex-col">
              <p className="text-[#0e141b] text-base font-bold leading-tight mb-2">{title}</p>
              <p className="text-[#4e7397] text-sm font-normal leading-normal">
                {description.replace(/\n/g, '').slice(0, 50)}...
              </p>
            </div>
            <div
              className="w-1/3 bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
              style={{
                backgroundImage: `url("${image}")`,
              }}
            ></div>
          </div>
        ))}
      </div>
      <div style={{bottom: bottomPosition}} className={`fixed w-full h-[72px] p-[16px]`}>
        <button className="bg-buttonColor text-white">+ 투표 추가</button>
      </div>
    </div>
  );
};

export default page;
