'use server';

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

export const findAllPosts = async () => {
  const posts = await prisma.balletPost.findMany();

  return posts;
};

export const findPostById = async (id: string) => {
  const post = await prisma.balletPost.findUnique({
    where: {
      id,
    },
  });

  return post;
};
