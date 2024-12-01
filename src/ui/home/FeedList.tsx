import Feed from '../common/Feed';

const mockedFeedList = [
  {
    id: 1,
    title: '글 제목',
    description: '짧은 글 내용',
    date: '2024-09-12',
    category: '질문',
    views: 200,
    image:
      'https://images.unsplash.com/photo-1726587912121-ea21fcc57ff8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
  },
  {
    id: 1,
    title: '글 제목',
    description:
      '긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용 긴 글 내용',
    date: '2024-09-16',
    category: '꿀팁',
    views: 1000,
    image:
      'https://images.unsplash.com/photo-1726587912121-ea21fcc57ff8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
  },
];

const categoryList = ['전체', '질문', '꿀팁', '수다', '정보', '공지', '자유', '취미', '공유'];

export default function FeedList() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="text-black flex items-center gap-2 overflow-x-auto hide-scrollbar">
        {categoryList.map((category, idx) => (
          <div
            key={idx}
            className={`shrink-0 border border-gray-500 py-2 px-3 rounded-full text-sm ${idx === 0 ? 'bg-gray-500 text-white' : 'bg-white text-gray-500'}`}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {mockedFeedList.map(feed => (
          <Feed key={feed.id} feed={feed} />
        ))}
      </div>
    </div>
  );
}
