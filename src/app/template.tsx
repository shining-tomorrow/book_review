'use client';

import SideBar from '@/ui/layout/SideBar';
import {useState} from 'react';
import {LuMenu} from 'react-icons/lu';

/**
 * 래퍼 컴포넌트지만,
 * 라우트 이동할 때마다 새로운 인스턴스를 만듦
 * 따라서, 사이드바를 닫는 함수를 호출할 필요가 없다. 라우팅하면 초기값인 false로 세팅되기 때문
 */
const Template = ({children}: {children: React.ReactNode}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* sidebar 렌더 */}
      <div className="absolute right-header-x-margin mx-header-x-margin z-header-zIndex h-header-height md:h-desktop-header-height flex items-center">
        <LuMenu size="20" className="cursor-pointer" onClick={() => setIsSidebarOpen(prev => !prev)} />
      </div>
      {isSidebarOpen && <SideBar setIsSidebarOpen={setIsSidebarOpen} />}

      {/* page 렌더 */}
      <div className="h-screen px-4 md:px-8 pb-bottom-nav-height overflow-auto pt-header-height md:pt-desktop-header-height">
        {children}
      </div>
    </>
  );
};

export default Template;
