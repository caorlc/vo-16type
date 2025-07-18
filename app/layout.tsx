import type { Metadata } from 'next'
import './globals.css'
import Link from "next/link";
import Header from "@/components/Header";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MicrosoftClarity from "@/components/MicrosoftClarity";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: '16タイプ診断 | 日本人向けの16タイプ診断',
  description: '世界で最も信頼されている16タイプ診断で、あなたの隠れた才能と可能性を発見。科学的根拠に基づいた16タイプ診断で、16の性格タイプからあなたにぴったりのタイプを特定します。',
  keywords: '',
  authors: [{ name: '16タイプ診断' }],
  creator: '16タイプ診断',
  publisher: '16タイプ診断',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.my16type.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '16タイプ診断 | 日本人向けの16タイプ診断テスト',
    description: '世界で最も信頼されている16タイプ診断で、あなたの隠れた才能と可能性を発見。科学的根拠に基づいた16タイプ診断で、16の性格タイプからあなたにぴったりのタイプを特定します。',
    url: 'https://www.my16type.com',
    siteName: '16タイプ診断',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '16タイプ診断 - 日本人向けの16タイプ診断',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '16タイプ性格診断 | 日本人のための16タイプ性格診断テスト',
    description: '世界で最も信頼されている16タイプ性格診断で、あなたの隠れた才能と可能性を発見。',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="16タイプ診断" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8986403656669494"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <GoogleAnalytics />
        <MicrosoftClarity />
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}

type Col = 1 | 2 | 3 | 4 | 5 | 6 | 7
type AB = 'A' | 'B'
type Question = { id: number, text: string, col: Col }
type Answer = 'A' | 'B'

// 题号到Col的映射
// const questionColMap: Col[] = []
// for (let i = 0; i < 70; i++) {
//   questionColMap.push((i % 7) + 1 as Col)
// }

// 假设 answers: Answer[]，顺序和题号一致
// const colScore: Record<Col, { A: number, B: number }> = {
//   1: { A: 0, B: 0 },
//   2: { A: 0, B: 0 },
//   3: { A: 0, B: 0 },
//   4: { A: 0, B: 0 },
//   5: { A: 0, B: 0 },
//   6: { A: 0, B: 0 },
//   7: { A: 0, B: 0 },
// }

// answers.forEach((ans, idx) => {
//   const col = questionColMap[idx]
//   colScore[col][ans]++
// })

// 计算各维度分数（严格按图片规则）
// const E = colScore[1].A
// const I = colScore[1].B
// const S = colScore[3].A + colScore[2].A
// const N = colScore[3].B + colScore[2].B
// const T = colScore[5].A + colScore[4].A
// const F = colScore[5].B + colScore[4].B
// const J = colScore[7].A + colScore[6].A
// const P = colScore[7].B + colScore[6].B

// const type =
//   (E >= I ? 'E' : 'I') +
//   (S >= N ? 'S' : 'N') +
//   (T >= F ? 'T' : 'F') +
//   (J >= P ? 'J' : 'P')
