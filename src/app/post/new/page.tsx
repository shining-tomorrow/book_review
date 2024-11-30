'use client';

import Editor from '@/ui/common/Editor';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {NavBarHeight} from '../../../../const';

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e: any) => {
    setContent(e);
  };

  const handleClickCreatePost = async () => {
    const requestBody = {
      title,
      content,
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
