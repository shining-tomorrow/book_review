'use client';

import {useState} from 'react';
import {NavBarHeight} from '../../../const';
import LayerSelectCategory from './LayerSelectCategory';

const NewButton = () => {
  const [isOpenLayerSelectCategory, setIspenLayerSelectCategory] = useState<boolean>(false);
  const [category, setSelectCategory] = useState<string | null>(null);

  return (
    <>
      <button
        className="fixed p-[16px] bg-buttonColor text-white"
        style={{bottom: NavBarHeight + 8, right: '2rem'}}
        onClick={e => {
          e.preventDefault();
          setIspenLayerSelectCategory(true);
        }}
      >
        + 포스팅 추가
      </button>
      {isOpenLayerSelectCategory && <LayerSelectCategory setSelectCategory={setSelectCategory} />}
    </>
  );
};

export default NewButton;
