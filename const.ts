function isSmallScreenSize() {
  return window.matchMedia('(max-width: 768px)').matches;
}

export const NavBarHeight = 60;
export const HeaderHeight = isSmallScreenSize() ? 48 : 56;
export const DefaultImage =
  'https://zjnkgnavmphkyf5n.public.blob.vercel-storage.com/Screenshot%202024-09-24%20at%202.42.09%E2%80%AFAM-xyG8NY1itegh3C1Z3yH7u9eyCSBdIZ.png';
