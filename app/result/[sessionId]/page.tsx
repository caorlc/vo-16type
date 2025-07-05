"use client"

export const runtime = 'edge';

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Lock, Share2, RotateCcw, Star, Users, Briefcase, Heart } from "lucide-react"
import Link from "next/link"
import PremiumMask from "@/components/PremiumMask"

// 导入人格类型数据
import personalityData from '@/data/personality-results.json'

interface MBTIResult {
  type: string
  detail: Record<"EI"|"SN"|"TF"|"JP", { a: number, b: number }>
  timestamp: string
}

export default function ResultPage() {
  const params = useParams()
  const router = useRouter()
  const [result, setResult] = useState<MBTIResult | null>(null)
  const [showPremium, setShowPremium] = useState(false)
  const sessionId = params.sessionId as string

  useEffect(() => {
    const loadResult = async () => {
      // 先尝试从localStorage加载
      const storedResult = localStorage.getItem(`16type_result_${sessionId}`)
      if (storedResult) {
        setResult(JSON.parse(storedResult))
        return
      }
      
      // 如果localStorage没有，尝试从服务器获取
      try {
        const ipResponse = await fetch('/api/get-ip')
        const { ip } = await ipResponse.json()
        
        const resultResponse = await fetch(`/api/get-result?ip=${ip}`)
        const { result: serverResult } = await resultResponse.json()
        
        if (serverResult) {
          setResult(serverResult)
          // 保存到localStorage
          localStorage.setItem(`16type_result_${sessionId}`, JSON.stringify(serverResult))
        } else {
          router.push("/test")
        }
      } catch (error) {
        console.error('加载失败:', error)
        router.push("/test")
      }
    }
    
    loadResult()
  }, [sessionId, router])

  if (!result) {
    return <div>読み込み中...</div>
  }

  // 获取对应的人格类型数据
  const typeData = personalityData[result.type.toLowerCase() as keyof typeof personalityData]
  const typeInfo = typeData?.basicInfo || {
    name: "未知のタイプ",
    description: "このタイプについての情報はまだ準備中です",
    color: "bg-gray-500",
    traits: [],
    careers: [],
    strengths: [],
    weaknesses: []
  }

  const scrollToUnlock = () => {
    if (typeof window !== 'undefined') {
      document.getElementById('unlock-cta')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 头部结构：卡片+插画，左侧分层大字 */}
          <div className="mb-8 bg-white rounded-xl flex flex-col md:flex-row items-center p-8 shadow-xl">
            <div className="flex-1 md:pr-8 text-center md:text-left">
              <div className="text-lg font-semibold mb-2 text-gray-700">あなたの性格タイプ:</div>
              <div className="text-5xl md:text-6xl font-bold mb-2 text-gray-900">{typeInfo.name}</div>
              <div className="text-3xl md:text-4xl font-bold text-gray-800">{result.type}</div>
              {typeData?.typeDescription && (
                <p className="mt-6 text-lg text-gray-700 whitespace-pre-line">
                  {typeData.typeDescription}
                </p>
              )}
            </div>
            <img
              src={`/images/${result.type.toLowerCase()}.png`}
              alt={typeInfo.name}
              className="w-56 h-auto rounded-xl object-contain"
            />
          </div>

          {/* 概述部分 */}
          {typeData?.overview && (
            <Card className="mb-8 border-0 shadow-xl">
              <CardHeader className="pb-8">
                <CardDescription className="text-lg text-gray-700">
                  {typeData.overview}
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {/* General Traits模块 */}
          <div className="mb-8 bg-white rounded-xl p-6 shadow">
            {([
              { key: "EI", leftJa: "外向型", rightJa: "内向型", color: "bg-sky-600", text: "text-sky-600" },
              { key: "SN", leftJa: "直感型", rightJa: "現実型", color: "bg-yellow-500", text: "text-yellow-500" },
              { key: "TF", leftJa: "感情型", rightJa: "思考型", color: "bg-green-600", text: "text-green-600" },
              { key: "JP", leftJa: "探索型", rightJa: "計画型", color: "bg-purple-600", text: "text-purple-600" },
            ] as { key: keyof MBTIResult['detail'], leftJa: string, rightJa: string, color: string, text: string }[]).map((dim) => {
              const a = result.detail[dim.key].a;
              const b = result.detail[dim.key].b;
              const total = a + b;
              const leftPercent = Math.round((a / total) * 100);
              const rightPercent = 100 - leftPercent;
              const isLeft = leftPercent >= rightPercent;
              const percent = isLeft ? leftPercent : rightPercent;
              const label = isLeft ? dim.leftJa : dim.rightJa;
              const showLabelClass = dim.text;
              const circlePos = percent;

              return (
                <div key={dim.key} className="mb-8">
                  <div className="flex justify-center text-base font-bold mb-1">
                    <span className={showLabelClass}>{percent}% {label}</span>
                  </div>
                  <div className="relative h-4 rounded-full bg-gray-200">
                    <div
                      className={`absolute top-0 left-0 h-4 rounded-full ${dim.color}`}
                      style={{ width: `${percent}%` }}
                    />
                    {/* 圆点指示器 */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2"
                      style={{
                        left: `calc(${circlePos}% - 14px)`,
                        zIndex: 2,
                      }}
                    >
                      <div className="w-7 h-7 bg-white border-4 border-gray-300 rounded-full flex items-center justify-center shadow">
                        <div className={`w-3.5 h-3.5 rounded-full ${dim.color}`} />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-700 mt-1">
                    <span>{dim.leftJa}</span>
                    <span>{dim.rightJa}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 性格特徴模块 */}
          {typeData?.personalityTraits && (
            <section className="mb-8">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>性格特徴</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {typeData.personalityTraits.map((trait, idx) => (
                      <li key={idx} className="flex items-start text-base leading-snug">
                        <span className="text-green-500 mr-2 mt-0.5">✔</span>
                        <span>{trait}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          )}

          {/* 人际关系模块 */}
          {typeData?.relationships && (
            <section className="mb-8">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-2xl">人間関係について</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{typeData.relationships.description}</p>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-1">{`${result.type.toUpperCase()}の強み`}</h3>
                    <ul className="list-none space-y-1">
                      {typeData.relationships.strengths.map((strength, idx) => (
                        <li key={idx}>🟢 {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{`${result.type.toUpperCase()}の弱み`}</h3>
                    <ul className="list-none space-y-1">
                      {typeData.relationships.weaknesses.map((weakness, idx) => (
                        <li key={idx}>🔴 {weakness}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* 成功定义模块 */}
          {typeData?.success && (
            <section className="mb-8">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>{`${result.type.toUpperCase()}にとって成功とは何を意味するのでしょうか？`}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{typeData.success}</p>
                </CardContent>
              </Card>
            </section>
          )}

          {/* 强项发展模块 */}
          {typeData?.strengthsDevelopment && (
            <section className="mb-8">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>{`${result.type.toUpperCase()} の強みを最大限に発揮する方法`}</CardTitle>
                </CardHeader>
                <CardContent>
                  <PremiumMask
                    title="今すぐロックを解除"
                    desc="このセクションでは、あなたの性格タイプに合った課題の乗り越え方や成長のヒントを紹介しています。続きはプレミアムでご覧いただけます。"
                    buttonText="すべての結果のロックを解除"
                    onUnlockClick={scrollToUnlock}
                  >
                    <p>{typeData.strengthsDevelopment.description}</p>
                    <ul className="list-disc pl-4 mt-2">
                      {typeData.strengthsDevelopment.basicStrengths.map((strength, idx) => (
                        <li key={idx}>{strength}</li>
                      ))}
                    </ul>
                    <p className="mt-2">内向的直観を発達させ、自分の認識の中に可能性を見ることができる程度まで発達した{result.type}は、これらの非常に特別な才能を享受するでしょう：</p>
                    <ul className="list-disc pl-4 mt-2">
                      {typeData.strengthsDevelopment.advancedStrengths.map((strength, idx) => (
                        <li key={idx}>{strength}</li>
                      ))}
                    </ul>
                  </PremiumMask>
                </CardContent>
              </Card>
            </section>
          )}

          {/* 潜在问题模块 */}
          {typeData?.potentialProblems && (
            <section className="mb-8">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>潜在的な問題</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{typeData.potentialProblems.description}</p>
                  <div className="relative mt-4">
                    <h3 className="font-semibold mb-2 text-lg">なぜこの問題を起こるか</h3>
                    <PremiumMask
                      title="今すぐロックを解除"
                      desc="このセクションでは、あなたの性格タイプが直面しやすい課題の根本原因を詳しく解説しています。詳細を読むにはプレミアム登録が必要です。"
                      buttonText="すべての結果のロックを解除"
                      onUnlockClick={scrollToUnlock}
                    >
                      <div>{typeData.potentialProblems.causes}</div>
                    </PremiumMask>
                  </div>
                  <div className="relative mt-4">
                    <h3 className="font-semibold mb-2 text-lg">解決方法</h3>
                    <PremiumMask
                      title="今すぐロックを解除"
                      desc="ここでは、あなたの性格タイプに合った課題の乗り越え方や成長のヒントを紹介しています。続きはプレミアムでご覧いただけます。"
                      buttonText="すべての結果のロックを解除"
                      onUnlockClick={scrollToUnlock}
                    >
                      <div>{typeData.potentialProblems.solutions}</div>
                    </PremiumMask>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* 成功规则模块 */}
          {typeData?.successRules && (
            <section className="mb-8">
              <Card className="mb-4 relative overflow-hidden">
                <CardHeader>
                  <CardTitle>{` ${result.type.toUpperCase()} が成功を達成するために生きるべき10のルール`}</CardTitle>
                </CardHeader>
                <CardContent>
                  <PremiumMask
                    title="10の成功ルールをアンロック"
                    desc="あなたの性格に合わせた成功の秘訣を今すぐチェック！"
                    buttonText="10のルールをアンロック"
                    onUnlockClick={scrollToUnlock}
                  >
                    <div>
                      {typeData.successRules.map((rule, idx) => (
                        <div key={idx}>
                          {idx + 1}. {rule}<br />
                        </div>
                      ))}
                    </div>
                  </PremiumMask>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </div>

      {/* 付费CTA区 */}
      <section className="py-16 bg-orange-500 w-full">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {typeInfo.name}（{result.type}）の物語はまだ終わっていません
            </h2>
            <p className="text-lg text-orange-100 mb-8">
              {typeInfo.description}。<br />
              プレミアムレポートを解放すると、あなたの性格の隠れた側面や自己成長のための個別の洞察・ヒントが手に入ります。
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-full shadow-none"
              onClick={() => router.push(`/checkout/${sessionId}`)}
            >
              すべての結果のロックを解除（$2.9）
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
