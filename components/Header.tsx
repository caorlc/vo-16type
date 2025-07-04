'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import React from "react";

const navs = [
  { href: "/", label: "ホーム" },
  { href: "/types", label: "16タイプ" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MBTI診断</span>
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
          </nav>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow" size="sm">
          <Link href="/test" className="text-white">診断を始める</Link>
        </Button>
      </div>
    </header>
  );
} 