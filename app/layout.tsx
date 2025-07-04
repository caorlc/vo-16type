import type { Metadata } from 'next'
import './globals.css'
import Link from "next/link";

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">
            <img src="/placeholder-logo.png" alt="Logo" style={{ cursor: "pointer" }} />
          </Link>
        </header>
        {children}
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
