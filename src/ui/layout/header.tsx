import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../../../public/logo.png';
import BackButton from './BackButton';

const Header = () => {
  return (
    <header className="fixed w-full bg-[#f5f5f5] h-header-height md:h-desktop-header-height">
      <div className="w-[clac(100%-32px)] h-[calc(100%-8px)] mx-[16px] mt-[8px] border-b border-lineColor flex items-center">
        <BackButton />
        <Image
          src={logoImage}
          alt="사이트 로고"
          width={0}
          height={0}
          style={{
            width: 'auto',
            height: 'calc(100% - 8px)',
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
