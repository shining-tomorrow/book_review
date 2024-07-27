import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { PageProvider } from "@/providers/PageProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui/upload/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <PageProvider>
            <Header />
            <div className="px-8">{children}</div>
          </PageProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
