'use server';

import {BalletPostCategories, BalletPostCategory, findAllBalletPostCategories} from '@/db/post';
import {revalidateTag} from 'next/cache';

/**
 * POST 하는 db 함수나 routeHandler에서 호출할 때는 갱신이 안 됐다.
 * server action 방식만이 유일한 해결책이었다.
 * https://summerr.tistory.com/133
 */
export const revalidatePostList = () => {
  revalidateTag('posts');
};

// todo. 해당 user가 만든 카테고리만 가져오게 하기
export const getBalletPostCategory = async () => {
  const categories: BalletPostCategories = await findAllBalletPostCategories();

  return categories;
};

export const addBalletPostCategory = async (categoryName: string): Promise<BalletPostCategory> => {
  const category = await addBalletPostCategory(categoryName);

  return category;
};
