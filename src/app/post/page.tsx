import Link from 'next/link';
import {NavBarHeight} from '../../../const';

const Page = () => {
  return (
    <div>
      <Link href="/post/new">
        <button className="fixed p-[16px] bg-buttonColor text-white" style={{bottom: NavBarHeight + 8, right: '2rem'}}>
          + 포스팅 추가
        </button>
      </Link>
    </div>
  );
};

export default Page;
