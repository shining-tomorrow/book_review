"use client";

import { useHeaderContext } from "@/providers/PageProvider";
import Link from "next/link";
import React from "react";

const Header = () => {
  let { title } = useHeaderContext();

  return (
    <header className="h-[40px] md:h-[80px] border-b border-gray-300 flex justify-center items-center">
      <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
      <nav className="hidden md:block absolute right-[18px]">
        <Link href="/" className="px-4">
          Home
        </Link>
        <Link href="/profile" className="px-4">
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default Header;
