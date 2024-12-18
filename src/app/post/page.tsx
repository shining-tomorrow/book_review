import {findAllPosts} from '@/db/post';
import Feed from '@/ui/common/Feed';
import NewButton from '@/ui/post/NewButton';
import {unstable_cache} from 'next/cache';
import Link from 'next/link';

const getAllPosts = unstable_cache(
  async () => {
    const posts = findAllPosts();

    return posts;
  },
  ['posts'],
  {revalidate: 3600, tags: ['posts']},
);

const Page = async () => {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex flex-col gap-2">
        {posts.map((post: any) => {
          const feed = {
            id: post.id,
            title: post.title,
            description: post.content.replace(/<\/?[^>]+>/g, ' '),
            date: post.created_at,
            category: '',
            views: post.views,
          };
          return (
            <Link key={post.id} href={'/post/' + post.id}>
              <Feed feed={feed} dateFormat={{isISO: true}}></Feed>
            </Link>
          );
        })}
      </div>
      <NewButton />
    </div>
  );
};

export default Page;
