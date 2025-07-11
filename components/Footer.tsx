'use client';
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.svg" alt="logo" className="w-8 h-8" />
              </div>
              <span className="text-xl font-bold">16Type</span>
            </Link>
            <p className="text-gray-400">科学的根拠に基づいた信頼性の高い性格診断サービスです</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">診断について</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">16タイプ性格診断とは</Link>
              </li>
              <li>
                <Link href="/personality" className="hover:text-white">16タイプについて</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">サポート</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/terms" className="hover:text-white">利用規約</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">お問い合わせ</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 16Type. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 