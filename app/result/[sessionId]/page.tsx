"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Lock, Share2, RotateCcw, Star, Users, Briefcase, Heart } from "lucide-react"
import Link from "next/link"

const mbtiTypes = {
  INTJ: {
    name: "建築家",
    description: "独創的で戦略的な思考を持つ完璧主義者",
    color: "bg-purple-500",
    traits: ["戦略的思考", "独立性", "完璧主義", "長期的視野"],
    careers: ["研究者", "エンジニア", "建築家", "戦略コンサルタント"],
    strengths: ["論理的思考", "独創性", "決断力", "集中力"],
    weaknesses: ["感情表現", "柔軟性", "チームワーク", "細かい作業"],
  },
  INFP: {
    name: "仲介者",
    description: "詩的で親切で利他的な人",
    color: "bg-teal-500",
    traits: ["理想主義", "創造性", "共感力", "価値観重視"],
    careers: ["作家", "カウンセラー", "芸術家", "社会活動家"],
    strengths: ["創造性", "共感力", "柔軟性", "価値観の一貫性"],
    weaknesses: ["現実的判断", "批判への敏感さ", "決断の遅さ", "組織運営"],
  },
  ENFJ: {
    name: "主人公",
    description: "カリスマ性があり、人々を鼓舞するリーダー",
    color: "bg-pink-500",
    traits: ["リーダーシップ", "共感力", "コミュニケーション", "人間関係"],
    careers: ["教師", "カウンセラー", "人事", "政治家"],
    strengths: ["リーダーシップ", "コミュニケーション", "共感力", "組織力"],
    weaknesses: ["自己犠牲", "批判への敏感さ", "完璧主義", "燃え尽き症候群"],
  },
  ENTP: {
    name: "討論者",
    description: "賢くて好奇心旺盛な思考家",
    color: "bg-orange-500",
    traits: ["革新性", "柔軟性", "議論好き", "可能性追求"],
    careers: ["起業家", "コンサルタント", "発明家", "ジャーナリスト"],
    strengths: ["創造性", "適応力", "コミュニケーション", "問題解決"],
    weaknesses: ["継続性", "細かい作業", "ルーティン", "感情的配慮"],
  },
  // Add more types as needed
}

interface MBTIResult {
  type: keyof typeof mbtiTypes
  scores: Record<string, number>
  timestamp: string
}

export default function ResultPage() {
  const params = useParams()
  const router = useRouter()
  const [result, setResult] = useState<MBTIResult | null>(null)
  const [showPremium, setShowPremium] = useState(false)
  const sessionId = params.sessionId as string

  useEffect(() => {
    const storedResult = localStorage.getItem(`mbti_result_${sessionId}`)
    if (storedResult) {
      setResult(JSON.parse(storedResult))
    } else {
      router.push("/test")
    }
  }, [sessionId, router])

  if (!result) {
    return <div>読み込み中...</div>
  }

  const typeInfo = mbtiTypes[result.type] || mbtiTypes.INTJ
  const dimensions = [
    { name: "外向性 vs 内向性", e: result.scores.E || 0, i: result.scores.I || 0 },
    { name: "感覚 vs 直感", s: result.scores.S || 0, n: result.scores.N || 0 },
    { name: "思考 vs 感情", t: result.scores.T || 0, f: result.scores.F || 0 },
    { name: "判断 vs 知覚", j: result.scores.J || 0, p: result.scores.P || 0 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MBTI診断</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                シェア
              </Button>
              <Button variant="outline" size="sm">
                <Link href="/test" className="flex items-center">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  再診断
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 答案明示 */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader className="text-center pb-8">
              <div className={`w-24 h-24 ${typeInfo.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className="text-3xl font-bold text-white">{result.type}</span>
              </div>
              <CardTitle className="text-4xl md:text-5xl text-gray-900 mb-4">あなたの性格タイプ: <b>{typeInfo.name}</b></CardTitle>
              <CardDescription className="text-xl text-gray-600 max-w-2xl mx-auto">
                {/* 概述1（免费） */}
                {typeInfo.description} これは概述1（示例）
              </CardDescription>
            </CardHeader>
            {/* 一张图 */}
            <CardContent className="flex justify-center mb-4">
              <img src={`/images/${result.type.toLowerCase()}.png`} alt={typeInfo.name} className="w-48 h-48 object-contain" />
            </CardContent>
            <CardContent className="text-center">
              {/* 概述2（免费） */}
              <p className="text-lg text-gray-700">これは概述2（示例）</p>
            </CardContent>
          </Card>

          {/* General Traits模块 */}
          <section className="mb-8">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>General Traits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">General Traits 概述（免费）</p>
                <ul className="list-disc pl-5">
                  {typeInfo.traits.map((trait, idx) => (
                    <li key={idx}>{trait}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 你的人际关系模块 */}
          <section className="mb-8">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>你的人际关系</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">人际关系概述（免费）</p>
                <div className="mb-2">
                  <h4 className="font-semibold">人际关系强项</h4>
                  <p>强项一段话（免费）</p>
                </div>
                <div>
                  <h4 className="font-semibold">人际关系弱项</h4>
                  <p>弱项一段话（免费）</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* What does Success mean to an ENFJ? 模块 */}
          <section className="mb-8">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>What does Success mean to an {result.type}?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Success模块概述（免费）</p>
              </CardContent>
            </Card>
          </section>

          {/* Allowing Your ENFJ Strengths to Flourish 模块 */}
          <section className="mb-8">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Allowing Your {result.type} Strengths to Flourish</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Strengths to Flourish 概述（免费）</p>
                <div className="relative mt-4">
                  <div className="font-semibold mb-2">Making others feel valued and important</div>
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-md" style={{minHeight:'100%', minWidth:'100%'}}>
                    <Lock className="w-10 h-10 text-orange-500 mb-3" />
                    <div className="text-lg font-bold text-gray-800 mb-1">今すぐロックを解除</div>
                    <div className="text-sm text-gray-500 mb-5 text-center">フルレポートを取得して、あなたの個性に合った10のアドバイスをアンロックしましょう。</div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-2 rounded-full font-semibold shadow min-w-[220px]" onClick={() => router.push(`/checkout/${sessionId}`)}>
                      すべての結果のロックを解除
                    </Button>
                  </div>
                  <div className="blur-sm select-none pointer-events-none">这里是付费内容的占位符，实际内容更丰富更长更有料</div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Potential Problem Areas 模块 */}
          <section className="mb-8">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Potential Problem Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <p>问题描述（免费）</p>
                <div className="relative mt-4">
                  <div className="font-semibold mb-2">Explanation of Problems</div>
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-md" style={{minHeight:'100%', minWidth:'100%'}}>
                    <Lock className="w-10 h-10 text-orange-500 mb-3" />
                    <div className="text-lg font-bold text-gray-800 mb-1">今すぐロックを解除</div>
                    <div className="text-sm text-gray-500 mb-5 text-center">フルレポートを取得して、あなたの個性に合った6つの課題解説をアンロックしましょう。</div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-2 rounded-full font-semibold shadow min-w-[220px]" onClick={() => router.push(`/checkout/${sessionId}`)}>
                      すべての結果のロックを解除
                    </Button>
                  </div>
                  <div className="blur-sm select-none pointer-events-none">这里是Explanation付费内容的占位符，实际内容更丰富更长更有料</div>
                </div>
                <div className="relative mt-4">
                  <div className="font-semibold mb-2">Solutions</div>
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-md" style={{minHeight:'100%', minWidth:'100%'}}>
                    <Lock className="w-10 h-10 text-orange-500 mb-3" />
                    <div className="text-lg font-bold text-gray-800 mb-1">今すぐロックを解除</div>
                    <div className="text-sm text-gray-500 mb-5 text-center">フルレポートを取得して、あなたの個性に合った6つの解決策をアンロックしましょう。</div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-2 rounded-full font-semibold shadow min-w-[220px]" onClick={() => router.push(`/checkout/${sessionId}`)}>
                      すべての結果のロックを解除
                    </Button>
                  </div>
                  <div className="blur-sm select-none pointer-events-none">这里是Solutions付费内容的占位符，实际内容更丰富更长更有料</div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Ten Rules to Live By to Achieve ENFJ/ENTJ Success 模块 */}
          <section className="mb-8">
            <Card className="mb-4 relative overflow-hidden">
              <CardHeader>
                <CardTitle>Ten Rules to Live By to Achieve {result.type} Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-md" style={{minHeight:'100%', minWidth:'100%'}}>
                  <Lock className="w-10 h-10 text-orange-500 mb-3" />
                  <div className="text-lg font-bold text-gray-800 mb-1">今すぐロックを解除</div>
                  <div className="text-sm text-gray-500 mb-5 text-center">フルレポートを取得して、あなたの個性に合った10の黄金法則をアンロックしましょう。</div>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-2 rounded-full font-semibold shadow min-w-[220px]" onClick={() => router.push(`/checkout/${sessionId}`)}>
                    すべての結果のロックを解除
                  </Button>
                </div>
                <div className="blur-sm select-none pointer-events-none">这里是Ten Rules付费内容的占位符，实际内容更丰富更长更有料</div>
              </CardContent>
            </Card>
            <Card className="mb-4 relative overflow-hidden">
              <CardHeader>
                <CardTitle>Ten Rules to Live By to Achieve ENTJ Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-md" style={{minHeight:'100%', minWidth:'100%'}}>
                  <Lock className="w-10 h-10 text-orange-500 mb-3" />
                  <div className="text-lg font-bold text-gray-800 mb-1">今すぐロックを解除</div>
                  <div className="text-sm text-gray-500 mb-5 text-center">フルレポートを取得して、あなたの個性に合った10の黄金法則をアンロックしましょう。</div>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-2 rounded-full font-semibold shadow min-w-[220px]" onClick={() => router.push(`/checkout/${sessionId}`)}>
                    すべての結果のロックを解除
                  </Button>
                </div>
                <div className="blur-sm select-none pointer-events-none">这里是Ten Rules付费内容的占位符，实际内容更丰富更长更有料</div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
