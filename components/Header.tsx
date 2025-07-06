'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useResult } from "@/hooks/use-result";
import React from "react";

const navs = [
  { href: "/", label: "ホーム" },
  { href: "/types", label: "16タイプ" },
];

export default function Header() {
  const pathname = usePathname();
  const { result } = useResult();

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.svg" alt="logo" className="w-8 h-8" />
              </div>
              <span className="text-xl font-bold text-gray-900">16タイプ性格診断</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 ml-6">
            {navs.map((nav) => (
              <Link
                key={nav.href}
                href={nav.href}
                className={
                  `text-gray-600 hover:text-gray-900` +
                  (pathname === nav.href ? " font-bold text-orange-500" : "")
                }
              >
                {nav.label}
              </Link>
            ))}
            {result && (
              <Link
                href={`/result/${(result.type || result.mbtiType || '').toLowerCase()}`}
                className={
                  `text-gray-600 hover:text-gray-900` +
                  (pathname.includes('/result/') ? " font-bold text-orange-500" : "")
                }
              >
                あなたの診断結果
              </Link>
            )}
          </nav>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow" size="sm">
          <Link href="/test" className="text-white">もう一度診断する</Link>
        </Button>
      </div>
    </header>
  );
} 