'use client';

import {useRouter} from 'next/navigation';
import {IoChevronBackSharp} from 'react-icons/io5';

/**
 * TODO. canGoBack일 때만 버튼 노출하기
 */
const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return <IoChevronBackSharp className="md:hidden text-buttonColor" size="30" onClick={handleClick} />;
};

export default BackButton;
