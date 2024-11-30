import {prisma} from './client';

export interface CreatePostRequestParam {
  title: string;
  content: string;
  userId: string;
}
export async function createNewPost({title, content, userId}: CreatePostRequestParam): Promise<any> {
  const post = await prisma.balletPost.create({
    data: {
      title,
      content,
      author_id: userId,
    },
  });

  return post;
}
