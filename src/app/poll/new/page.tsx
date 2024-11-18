'use client';

import {CreatePollRequestParam} from '@/db/poll';
import {PutBlobResult} from '@vercel/blob';
import {DateTime} from 'luxon';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {FormEvent, useState} from 'react';
import {FaImages} from 'react-icons/fa6';
import {LuMinusCircle, LuPlusCircle} from 'react-icons/lu';
import {DefaultImage} from '../../../../const';

const Page = () => {
  const router = useRouter();

  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [options, setOptions] = useState<string[]>(['']);
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

    const validOptions = options.filter(option => !!option);

    if (validOptions.length < 2) {
      alert('투표 항목을 2개 이상 만들어 주세요.');

      return;
    }

    const endDate = new Date(temp.end_date);

    if (hasEndDate && isNaN(endDate.getTime())) {
      alert('투표 마감 날짜를 입력해주세요.');

      return;
    }

    const requestBody: Partial<CreatePollRequestParam> = {
      title: temp.title,
      description: temp.description,
      ...(blob?.url ? {thumbnail_url: blob.url} : {}),
      allow_multiple: isAllowMultipleChoice,
      ...(hasEndDate && temp.end_date ? {end_date: endDate} : {}),
      options: validOptions,
    };

    const response = await fetch('/api/poll/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      alert('투표 생성 완료');

      const result = await response.json();

      router.push('/poll/' + result.id);
      return;
    }

    alert('투표 생성에 실패했습니다.');
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

  const handleChangeOption = (target: HTMLInputElement, index: number) => {
    setOptions(prev => {
      return prev.map((option, idx) => {
        if (idx === index) {
          return target.value;
        }

        return option;
      });
    });
  };

  const handleClickRemoveOption = (index: number) => {
    setOptions(prev => {
      return prev.filter((_, idx) => idx !== index);
    });
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
        <div className="flex flex-grow items-center">
          {/* TODO: 디폴트 이미지 넣기 */}
          {blob?.url ? (
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
          ) : (
            <div className="flex justify-center items-center w-[168px] h-[168px] bg-customGray">
              <FaImages size="30" />
            </div>
          )}
          {/* 기본 인풋.type=file 스타일은 수정할 수 없어 보이지 않게 함. 대신 label로 탐색기(파인더) 열기 */}
          <div>
            <label
              htmlFor="thumbnail_url"
              className="px-[8px] py-[4px] ml-[8px] rounded-[6px] border-[1px] border-black"
              style={{height: 'fit-content', cursor: 'pointer'}}
            >
              {blob ? '수정' : '업로드'}
            </label>
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
        </div>
      </div>

      <div className="flex w-full pt-[6px]">
        <label className="w-[150px]" htmlFor="description">
          투표 설명
        </label>
        <textarea className="flex-grow min-h-[300px]" id="description" name="description"></textarea>
      </div>

      <div className="flex w-full pt-[6px]">
        <div className="w-[150px]">투표 항목</div>
        <div className="flex flex-col flex-grow">
          {options.map((option, index) => {
            return (
              <div className="flex items-center" key={'option#' + index}>
                <span className="mr-[4px]">&nbsp;{index + 1}&nbsp;</span>
                <input
                  className="flex-grow p-[4px] my-[4px]"
                  type="text"
                  autoComplete="off"
                  id={'option#' + index}
                  name={'option#' + index}
                  placeholder="투표 항목을 입력해주세요."
                  value={options[index]}
                  onChange={e => handleChangeOption(e.target, index)}
                />
                {index == 0 ? (
                  <LuPlusCircle
                    size="20"
                    className="ml-[4px] cursor-pointer"
                    onClick={() => setOptions(prev => [...prev, ''])}
                  />
                ) : (
                  <LuMinusCircle
                    size="20"
                    className="ml-[4px] cursor-pointer"
                    onClick={() => handleClickRemoveOption(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
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
