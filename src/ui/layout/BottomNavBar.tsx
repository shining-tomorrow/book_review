import Link from 'next/link';

const navItems = [
  {
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        fill="none"
        stroke="currentColor"
        strokeWidth="16"
        viewBox="0 0 256 256"
      >
        <path d="M224 115.55V208a16 16 0 0 1-16 16H168a16 16 0 0 1-16-16V168a8 8 0 0 0-8-8H112a8 8 0 0 0-8 8v40a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V115.55a16 16 0 0 1 5.17-11.78l80-75.48a16 16 0 0 1 21.53 0l80 75.48A16 16 0 0 1 224 115.55z" />
      </svg>
    ),
    label: '홈',
    url: '/',
  },
  {
    Icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
      </svg>
    ),
    label: '글쓰기',
    url: '/write',
  },
  {
    Icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
      </svg>
    ),
    label: '내 정보',
    url: '/profile',
  },
];

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 w-full">
      <div className="flex justify-between bg-white border-t-[1px] border-gray-100 text-[#637588]">
        {navItems.map(({Icon, label, url}) => (
          <div key={label} className="flex-1">
            <Link className="py-2 flex flex-col items-center justify-end" href={url}>
              <div className="flex h-8 items-center justify-center">{Icon}</div>
              <p className="text-xs leading-normal">{label}</p>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
