import {findAllPosts, findPostById} from '@/db/post';
import Link from 'next/link';
import {NavBarHeight} from '../../../../const';

/**
 * 서버 컴포넌트에서는  own api route나 route handler에서 fetch하지 않는다
 * 직접 server-side logic을 호출해야 한다.
 * https://nextjs-faq.com/fetch-api-in-rsc
 */
const getPost = async (id: string) => {
  const post = await findPostById(id);

  return post;
};

export async function generateStaticParams() {
  const posts = await findAllPosts();

  return posts.map((post: any) => ({
    id: post.id,
  }));
}

export async function generateMetadata({params}: {params: {id: string}}) {
  const post = await getPost(params.id);

  return {
    title: post?.title ?? '',
  };
}

const Page = async ({params}: {params: {id: string}}) => {
  const post = await getPost(params.id);

  return (
    <div>
      <div>{post.title}</div>
      <div dangerouslySetInnerHTML={{__html: post.content}}></div>
      <Link href="/post">
        <button className="fixed p-[16px] bg-buttonColor text-white" style={{bottom: NavBarHeight + 8, right: '2rem'}}>
          포스팅 목록 가기
        </button>
      </Link>
    </div>
  );
};

export default Page;
