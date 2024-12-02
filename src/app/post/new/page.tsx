'use client';

import {revalidatePostList} from '@/app/actions/post';
import {CreatePostRequestParam} from '@/db/post';
import Editor from '@/ui/common/Editor';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {NavBarHeight} from '../../../../const';

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  /**
   * TODO. categoryId 선택하는 로직 추가하기
   */
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const router = useRouter();

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e: any) => {
    setContent(e);
  };

  const handleClickCreatePost = async () => {
    if (!categoryId) {
      alert('카테고리를 선택해주세요');

      return;
    }

    const requestBody: Omit<CreatePostRequestParam, 'userId'> = {
      title,
      content,
      category_id: categoryId,
    };

    const response = await fetch('/api/post/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      alert('포스팅 생성 완료');

      const result = await response.json();

      revalidatePostList();

      router.push('/post/' + result.id);

      return;
    }

    alert('포스팅 생성에 실패했습니다.');
  };

  return (
    <div>
      <label htmlFor="title"></label>
      <input
        className="w-full h-[50px] my-[8px] text-[35px] px-[8px]"
        type="text"
        id="title"
        name="title"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={handleChangeTitle}
      ></input>
      <Editor content={content} setContent={handleChangeContent} />
      <button
        className="fixed p-[16px] bg-buttonColor text-white"
        style={{bottom: NavBarHeight + 8, right: '2rem'}}
        onClick={handleClickCreatePost}
      >
        포스팅 생성하기
      </button>
    </div>
  );
};

export default Page;
