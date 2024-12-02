'use client';

import {addBalletPostCategory} from '@/db/post';
import Image from 'next/image';
import {useState} from 'react';

const NoCategory = ({getCategories}: {getCategories: () => Promise<void>}) => {
  const [categoryName, setCategoryName] = useState('');
  /**
   * TODO
   * (1) color는 hex 형태만 받도록 하기
   * (2) 색상 팔레트 추가하기
   */
  const [color, setColor] = useState('');

  const handleClickAddCategory = async () => {
    await addBalletPostCategory(categoryName, color);
    await getCategories();
  };

  return (
    <div className="flex flex-none flex-col items-center justify-center">
      <Image
        src="https://zjnkgnavmphkyf5n.public.blob.vercel-storage.com/Boy%20Searching%20The%20Empty%20Mail%20Box%203D%20Illustration%20(HD)-QQzJmkimdrR5mkg4jcFclmsr2xOtZr.png"
        width="120"
        height="120"
        alt="no category"
      />
      <div className="text-sm">
        등록된 카테고리가 없어요. <br /> 카테고리를 추가해주세요.
      </div>
      <div className="flex flex-col">
        <div className="pt-[8px] flex">
          <label htmlFor="categoryName" className="text-sm">
            카테고리명
          </label>
          <input
            id="categoryName"
            name="categoryName"
            value={categoryName}
            className="px-[4px] ml-[8px] border-lineColor border-[1px] rounded flex flex-grow"
            onChange={e => setCategoryName(e.target.value)}
          ></input>
        </div>
        <div className="pt-[8px]">
          <label htmlFor="color" className="text-sm">
            색상
          </label>
          <input
            id="color"
            name="color"
            value={color}
            className="px-[4px] border-lineColor border-[1px] rounded ml-[8px]"
            onChange={e => setColor(e.target.value)}
          ></input>
          <button
            className="ml-[8px] py-[4px] px-[8px] rounded-lg text-sm bg-buttonColor text-white"
            onClick={handleClickAddCategory}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoCategory;
