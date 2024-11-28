import {auth} from '@/app/api/auth/[...nextauth]/auth.util';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../../../public/logo.png';
import BackButton from './BackButton';

const Header = async () => {
  const session = (await auth()) as any;

  return (
    <header className="fixed w-full bg-[#f5f5f5] h-header-height md:h-desktop-header-height z-header-zIndex">
      <div className="w-[clac(100%-32px)] h-[calc(100%-8px)] mx-header-x-margin mt-[8px] border-b border-lineColor flex items-center">
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
        <nav className="hidden md:flex absolute right-[52px]">
          <Link href="/" className="px-4">
            Home
          </Link>
          <Link href="/poll" className="px-4">
            Poll
          </Link>
          {session ? (
            <>
              <Link href="/profile" className="px-4">
                <Image
                  src={session.user.profile_image_url}
                  alt="프로필 이미지"
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] rounded-full"
                />
              </Link>
              <Link href="/api/auth/signout" className="px-4">
                Sign Out
              </Link>
            </>
          ) : (
            <Link href="/api/auth/signin/callack=/" className="px-4">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
