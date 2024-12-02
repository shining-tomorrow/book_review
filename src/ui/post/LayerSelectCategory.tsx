'use client';

import {getBalletPostCategory} from '@/app/actions/post';
import {BalletPostCategories} from '@/db/post';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import NoCategory from './NoCategory';

const LayerSelectCategory = ({setSelectCategory}: {setSelectCategory: Dispatch<SetStateAction<string | null>>}) => {
  const [categories, setCategories] = useState<BalletPostCategories>([]);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const getCategories = async () => {
    const _categories = await getBalletPostCategory();

    setCategories(_categories);
    setHasFetched(true);
  };

  // todo. useEffect 안에서 useState 사용 피하기
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {createPortal(
        <div className="fixed flex items-center justify-center z-cover-header inset-0 bg-popup-bg bg-opacity-popup-bg">
          <div className="flex flex-col w-[300px] h-[300px] bg-white">
            <div className="m-[8px] ">
              <div className="border-b-[1px] border-lineColor">
                <div className="flex items-center justify-center">카테고리를 선택해주세요</div>
              </div>
            </div>

            {!hasFetched ? (
              <></>
            ) : categories.length === 0 ? (
              <div className="flex-grow flex items-center justify-center">
                <NoCategory getCategories={getCategories} />
              </div>
            ) : (
              <div className="m-[12px]">
                {categories.map(category => {
                  return (
                    <div key={category.id}>
                      <div style={{color: category.color}}>{category.name}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default LayerSelectCategory;
