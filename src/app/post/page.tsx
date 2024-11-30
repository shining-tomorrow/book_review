import Link from 'next/link';
import {NavBarHeight} from '../../../const';

const getAllPosts = async () => {
  /**
   * 서버 사이드에서는 full url을 넣어주어야 함
   */
  const res = await fetch(process.env.URL + '/api/post', {
    method: 'GET',
    cache: 'force-cache',
  });

  const posts = await res.json();

  return posts;
};

const Page = async () => {
  const posts = await getAllPosts();

  return (
    <div>
      <div>
        {posts.map((post: any) => {
          return (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <div>{post.content}</div>
            </div>
          );
        })}
      </div>
      <Link href="/post/new">
        <button className="fixed p-[16px] bg-buttonColor text-white" style={{bottom: NavBarHeight + 8, right: '2rem'}}>
          + 포스팅 추가
        </button>
      </Link>
    </div>
  );
};

export default Page;
