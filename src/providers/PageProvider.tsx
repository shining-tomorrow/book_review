"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const HeaderContext = createContext<{
  title: string;
}>({ title: "" });

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState("오발완");
  const pathname = usePathname();

  useEffect(() => {
    const updatePageTitle = () => {
      switch (pathname) {
        case "/profile":
          setTitle("My 프로필");
          break;
        default:
          setTitle("오발완");
          break;
      }
    };

    updatePageTitle();
  }, [pathname]);

  return (
    <HeaderContext.Provider value={{ title }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
