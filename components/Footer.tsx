'use client';
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-7 gap-8">
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
            <h3 className="font-semibold mb-4">サービス</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">16タイプ診断とは</Link>
              </li>
              <li>
                <Link href="/personality" className="hover:text-white">16タイプについて</Link>
              </li>
              <li>
                <a href="https://www.myikigai.pro/" target="_blank" rel="noopener noreferrer follow" className="hover:text-white">生まれてきた意味診断</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">分析家のタイプ一覧</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/personality/entp" className="hover:text-white">ENTP（討論者）</Link></li>
              <li><Link href="/personality/intp" className="hover:text-white">INTP（論理学者）</Link></li>
              <li><Link href="/personality/entj" className="hover:text-white">ENTJ（指揮官）</Link></li>
              <li><Link href="/personality/intj" className="hover:text-white">INTJ（建築家）</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">外交官のタイプ一覧</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/personality/enfp" className="hover:text-white">ENFP（運動家）</Link></li>
              <li><Link href="/personality/infp" className="hover:text-white">INFP（仲介者）</Link></li>
              <li><Link href="/personality/enfj" className="hover:text-white">ENFJ（主人公）</Link></li>
              <li><Link href="/personality/infj" className="hover:text-white">INFJ（提唱者）</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">番人のタイプ一覧</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/personality/estp" className="hover:text-white">ESTP（起業家）</Link></li>
              <li><Link href="/personality/istp" className="hover:text-white">ISTP（巨匠）</Link></li>
              <li><Link href="/personality/estj" className="hover:text-white">ESTJ（幹部）</Link></li>
              <li><Link href="/personality/istj" className="hover:text-white">ISTJ（管理者）</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">探検家のタイプ一覧</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/personality/esfp" className="hover:text-white">ESFP（エンターテイナー）</Link></li>
              <li><Link href="/personality/isfp" className="hover:text-white">ISFP（冒険家）</Link></li>
              <li><Link href="/personality/esfj" className="hover:text-white">ESFJ（領事）</Link></li>
              <li><Link href="/personality/isfj" className="hover:text-white">ISFJ（擁護者）</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">サポート</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/terms" className="hover:text-white">利用規約</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
              </li>
              <li>
                <a href="mailto:support@my16type.com" className="hover:text-white">お問い合わせ</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 16Type. All rights reserved.
            <span className="ml-4 block md:inline">ご質間やお問い合わせがごさいましたら、メールアドレスまでご連絡ください。<a href="mailto:support@my16type.com" className="underline hover:text-white ml-1">support@my16type.com</a></span>
          </p>
        </div>
      </div>
    </footer>
  );
} 