'use server';

import {revalidateTag} from 'next/cache';

/**
 * POST 하는 db 함수나 routeHandler에서 호출할 때는 갱신이 안 됐다.
 * server action 방식만이 유일한 해결책이었다.
 * https://summerr.tistory.com/133
 */
export const revalidatePostList = () => {
  revalidateTag('posts');
};
