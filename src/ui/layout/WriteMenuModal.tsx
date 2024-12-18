'use client';

import {usePathname, useRouter} from 'next/navigation';
import {createPortal} from 'react-dom';
import {NavBarHeight} from '../../../const';

/**
 * ?isWriteMenuOpen=true 일 때 보임
 */
const WriteMenuModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const bottomPosition = NavBarHeight + 4;

  const handleClickOutside = () => {
    router.push(pathname);
  };

  return (
    <>
      {createPortal(
        <div
          onClick={handleClickOutside}
          className="fixed z-cover-header inset-0 bg-popup-bg bg-opacity-popup-bg overflow-y-auto h-full w-full"
        >
          <div
            className="absolute m-auto left-0 right-0 border w-fit shadow-lg rounded-md bg-white"
            style={{bottom: bottomPosition + 'px'}}
          >
            <div className="flex flex-col">
              {/* TODO: Link 연결 */}
              <div
                className="p-[10px] border-b-[1px] cursor-pointer"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                발레 일기 쓰기
              </div>
              <div
                className="p-[10px] cursor-pointer"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                게시판 글 쓰기
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default WriteMenuModal;
