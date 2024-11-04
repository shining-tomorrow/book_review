'use client';

import {PutBlobResult} from '@vercel/blob';
import Image from 'next/image';
import {FormEvent, useState} from 'react';
import {DefaultImage} from '../../../../const';

const Page = () => {
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = async (event: any) => {
    if (event.target.files.length === 0) {
      // 이전에 업로드했던 blob 제거
      if (blob) {
        // TODO delete api 호출
        setBlob(null);
      }

      return;
    }

    const file = event.target.files[0];

    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: 'POST',
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    setBlob(newBlob);
  };

  return (
    <form className="flex flex-col items-center justify-center w-[85%] mt-[10px]" onSubmit={handleSubmit}>
      <div className="flex w-full">
        <label className="w-[120px]" htmlFor="title">
          투표 제목
        </label>
        <input
          className="flex-grow"
          type="text"
          id="title"
          name="title"
          placeholder="투표 제목을 입력해주세요."
        ></input>
      </div>

      <div className="flex w-full">
        <div className="w-[120px]">투표 썸네일 (선택)</div>
        <div className="flex flex-grow">
          {/* TODO: 디폴트 이미지 넣기 */}
          <Image
            src={blob ? blob.url : DefaultImage}
            alt={''}
            width={168}
            height={168}
            sizes="168px"
            style={{
              width: '168px',
              height: 'auto',
            }}
          />
          {/* 기본 인풋.type=file 스타일은 수정할 수 없어 보이지 않게 함. 대신 label로 탐색기(파인더) 열기 */}
          <label htmlFor="thumbnailUrl" className="p-[8px] ml-[8px]" style={{height: 'fit-content', cursor: 'pointer'}}>
            {blob ? '업로드' : '수정'}
          </label>
        </div>
        <input
          className="flex-grow"
          type="file"
          id="thumbnailUrl"
          name="thumbnailUrl"
          accept=".jpg, .jpeg, .png"
          onChange={handleChange}
          style={{display: 'none'}}
        />
      </div>

      <div className="flex w-full">
        <label className="w-[120px]" htmlFor="description">
          투표 설명
        </label>
        <textarea className="flex-grow" id="description" name="description"></textarea>
      </div>

      <button type="submit">추가하기</button>
    </form>
  );
};

export default Page;
