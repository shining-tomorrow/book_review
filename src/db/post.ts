'use server';

import {auth} from '@/app/api/auth/[...nextauth]/auth.util';
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

export type BalletPostCategory = {
  id: string;
  name: string;
  color: string; // #3DAA9C
  created_at: Date;
  updated_at: Date;
  user_id: string;
};

export type BalletPostCategories = BalletPostCategory[];

export const findAllBalletPostCategories = async (): Promise<BalletPostCategories> => {
  const session = (await auth()) as any;

  const categories = await prisma.balletPostCategory.findMany({
    where: {
      user_id: session?.user?.id,
    },
  });

  return categories;
};

export const addBalletPostCategory = async (categoryName: string, color: string): Promise<BalletPostCategory> => {
  const session = (await auth()) as any;

  const category = await prisma.balletPostCategory.create({
    data: {
      name: categoryName,
      color,
      user_id: session?.user?.id,
    },
  });

  return category;
};
