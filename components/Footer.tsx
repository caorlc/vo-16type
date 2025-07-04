'use client';
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MBTI診断</span>
            </div>
            <p className="text-gray-400">科学的根拠に基づいた信頼性の高い性格診断サービス</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">診断について</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">MBTIとは</Link>
              </li>
              <li>
                <Link href="/types" className="hover:text-white">16タイプ</Link>
              </li>
              <li>
                <Link href="/test" className="hover:text-white">診断を始める</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">サポート</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/faq" className="hover:text-white">よくある質問</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">お問い合わせ</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">フォローする</h3>
            <p className="text-gray-400 mb-4">最新の性格診断情報をお届けします</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MBTI診断. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 