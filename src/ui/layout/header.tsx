'use client';

import {useHeaderContext} from '@/providers/PageProvider';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../../../public/logo.png';

const Header = () => {
  let {title} = useHeaderContext();

  return (
    <header className="h-[48px] md:h-[56px]">
      <div className="relative h-full mx-8 mt-[8px] border-b border-lineColor flex items-center">
        <Image
          src={logoImage}
          alt="사이트 로고"
          width={0}
          height={0}
          style={{
            width: 'auto',
            height: '100%',
          }}
        />
        <nav className="hidden md:block absolute right-[18px]">
          <Link href="/" className="px-4">
            Home
          </Link>
          <Link href="/profile" className="px-4">
            Profile
          </Link>
          <Link href="/poll" className="px-4">
            Poll
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
