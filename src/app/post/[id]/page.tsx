import Link from 'next/link';
import {NavBarHeight} from '../../../../const';

const getPost = async (id: string) => {
  const res = await fetch(process.env.URL + '/api/post/' + id, {
    cache: 'force-cache',
  });
  const post = await res.json();

  return post;
};

export async function generateStaticParams() {
  const posts = await fetch(process.env.URL + '/api/post', {cache: 'force-cache'}).then(res => res.json());

  return posts.map((post: any) => ({
    id: post.id,
  }));
}

export async function generateMetadata({params}: {params: {id: string}}) {
  const post = await getPost(params.id);

  return {
    title: post.title,
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
