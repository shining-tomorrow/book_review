import Link from 'next/link';
import {Dispatch, MutableRefObject, SetStateAction, useRef} from 'react';
import {createPortal} from 'react-dom';
import {GoHome} from 'react-icons/go';
import {IoCloseOutline} from 'react-icons/io5';
import {MdHowToVote} from 'react-icons/md';

const SideBar = ({setIsSidebarOpen}: {setIsSidebarOpen: Dispatch<SetStateAction<boolean>>}) => {
  const sidebarContentEl: MutableRefObject<null | HTMLDivElement> = useRef(null);

  const toggleSideBarOpen = (e: React.MouseEvent) => {
    if (sidebarContentEl.current?.contains(e.target as Node)) {
      return;
    }

    setIsSidebarOpen(prev => {
      console.log('prev', prev);
      return !prev;
    });
  };

  return (
    <>
      {createPortal(
        <div className="fixed z-cover-header inset-0 bg-popup-bg bg-opacity-popup-bg" onClick={toggleSideBarOpen}>
          <div ref={sidebarContentEl} className="absolute right-0 w-[320px] bg-white h-full flex flex-col">
            <div className="h-header-height md:h-desktop-header-height flex items-center justify-end mx-header-x-margin border-b border-lineColor">
              <IoCloseOutline size="30" className="cursor-pointer" onClick={() => setIsSidebarOpen(false)} />
            </div>
            <div className="mx-header-x-margin flex-grow pt-[8px]">
              <Link href="/" className="flex mb-[8px]">
                <GoHome size="20" className="mr-[4px]" />
                Home
              </Link>
              <Link href="/poll" className="flex mb-[8px]">
                <MdHowToVote size="20" className="mr-[4px]" />
                투표
              </Link>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default SideBar;
