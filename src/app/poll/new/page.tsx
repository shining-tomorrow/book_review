'use client';

import {CreatePollRequestParam} from '@/db/poll';
import {PutBlobResult} from '@vercel/blob';
import {DateTime} from 'luxon';
import Image from 'next/image';
import {FormEvent, useState} from 'react';
import {DefaultImage} from '../../../../const';

const Page = () => {
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [hasEndDate, setHasEndDate] = useState(false);
  const [isAllowMultipleChoice, setIsAllowMultipleChoice] = useState(false);

  const today = DateTime.now().toISODate(); // 2024-11-08

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formDataArray = Array.from(formData.entries());

    const temp: {[key: string]: any} = {};

    formDataArray.forEach(([key, value]) => {
      temp[key] = value;
    });

    if (!temp.title || !temp.description) {
      alert('제목과 설명은 필수 입력 사항입니다.');

      return;
    }

    console.log('temp', temp);
    const requestBody: Partial<CreatePollRequestParam> = {
      title: temp.title,
      description: temp.description,
      allow_multiple: isAllowMultipleChoice,
      ...(hasEndDate && temp.end_date ? {end_date: temp.end_date} : {}),
    };

    blob?.url && (requestBody.thumbnail_url = blob.url);

    fetch('/api/poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then(res => {
      if (res.ok) {
        alert('투표 생성 완료');
      }

      console.log('res', res);
    });
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
      <div className="flex w-full pt-[6px]">
        <label className="w-[150px]" htmlFor="title">
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

      <div className="flex w-full pt-[6px]">
        <div className="w-[150px]">투표 썸네일 (선택)</div>
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
          <label
            htmlFor="thumbnail_url"
            className="p-[8px] ml-[8px]"
            style={{height: 'fit-content', cursor: 'pointer'}}
          >
            {blob ? '수정' : '업로드'}
          </label>
        </div>
        <input
          className="flex-grow"
          type="file"
          id="thumbnail_url"
          name="thumbnail_url"
          accept=".jpg, .jpeg, .png"
          onChange={handleChange}
          style={{display: 'none'}}
        />
      </div>

      <div className="flex w-full pt-[6px]">
        <label className="w-[150px]" htmlFor="description">
          투표 설명
        </label>
        <textarea className="flex-grow min-h-[300px]" id="description" name="description"></textarea>
      </div>

      <div className="flex w-full pt-[6px]">
        <label className="w-[150px]" htmlFor="options">
          투표 항목
        </label>
        <input
          className="flex-grow"
          type="text"
          id="title"
          name="title"
          placeholder="투표 제목을 입력해주세요."
        ></input>
      </div>

      <div className="flex w-full pt-[6px]">
        {/* label 태그가 input 요소를 감싸면 텍스트를 클릭했을 때도 선택 된다 */}
        <div className="w-[150px] pb-[10px]">투표 마감 날짜 여부</div>
        <div>
          <label htmlFor="has_end_date">
            <input
              className="w-[15px] pr-[6px]"
              type="checkbox"
              id="has_end_date"
              name="has_end_date"
              checked={hasEndDate}
              onChange={e => setHasEndDate(e.target.checked)}
            />
            있음
          </label>
          <label htmlFor="not_has_end_date" className="pl-[8px]">
            <input
              className="w-[15px] pr-[6px]"
              type="checkbox"
              id="not_has_end_date"
              name="not_has_end_date"
              checked={!hasEndDate}
              onChange={e => setHasEndDate(!e.target.checked)}
            />
            없음
          </label>
        </div>
      </div>

      <div className="flex w-full pt-[6px]" style={{display: hasEndDate ? '' : 'none'}}>
        <label className="w-[150px]" htmlFor="end_date">
          투표 마감 날짜
        </label>

        <input type="date" disabled={!hasEndDate} id="end_date" name="end_date" min={today}></input>
      </div>

      {/* 복수 선택 가능 여부 */}
      <div className="flex w-full pt-[6px]">
        <div className="w-[150px] pb-[10px]">복수 선택 가능 여부</div>
        <div>
          <label htmlFor="allow_multiple_choice">
            <input
              className="w-[15px] pr-[6px]"
              type="checkbox"
              id="allow_multiple_choice"
              name="allow_multiple_choice"
              checked={isAllowMultipleChoice}
              onChange={e => setIsAllowMultipleChoice(e.target.checked)}
            />
            가능
          </label>
          <label htmlFor="not_allow_multiple_choice" className="pl-[8px]">
            <input
              className="w-[15px] pr-[6px]"
              type="checkbox"
              id="not_allow_multiple_choice"
              name="not_allow_multiple_choice"
              checked={!isAllowMultipleChoice}
              onChange={e => setIsAllowMultipleChoice(!e.target.checked)}
            />
            불가능
          </label>
        </div>
      </div>

      <button type="submit" className="p-[16px] pl-[32px] pr-[32px] rounded-[4px] bg-buttonColor text-white">
        투표 등록
      </button>
    </form>
  );
};

export default Page;
