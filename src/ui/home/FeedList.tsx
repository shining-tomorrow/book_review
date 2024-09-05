const mockFeedList = Array.from({length: 10}, (_, i) => ({
  id: i,
  title: '글 제목 글 제목 글 제목 글 제목 글 제목',
  description:
    '글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용',
  image: 'https://cdn.usegalileo.ai/stability/31bdc9b2-f116-4477-a8a5-db1689be29ed.png',
}));

export default function FeedList() {
  return (
    <div className="p-2 flex flex-col">
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
  );
}
