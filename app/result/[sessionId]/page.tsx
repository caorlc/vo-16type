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
          {/* Result Header */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader className="text-center pb-8">
              <div className={`w-24 h-24 ${typeInfo.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className="text-3xl font-bold text-white">{result.type}</span>
              </div>
              <CardTitle className="text-4xl md:text-5xl text-gray-900 mb-4">{typeInfo.name}</CardTitle>
              <CardDescription className="text-xl text-gray-600 max-w-2xl mx-auto">
                {typeInfo.description}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Dimension Scores */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-orange-500" />
                あなたの性格傾向
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {dimensions.map((dim, index) => {
                const total = Object.values(dim)
                  .slice(1)
                  .reduce((a: number, b: number) => a + b, 0)
                const firstValue = Object.values(dim)[1] as number
                const percentage = total > 0 ? (firstValue / total) * 100 : 50

                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{dim.name}</span>
                      <span className="text-sm text-gray-600">
                        {Math.round(percentage)}% - {Math.round(100 - percentage)}%
                      </span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Free Content */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  主な特徴
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {typeInfo.traits.map((trait, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-green-500" />
                  適職
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {typeInfo.careers.map((career, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                      {career}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Premium Content (Locked) */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">さらに詳しい分析を見る</h3>
              <p className="text-gray-600">
                プレミアム版では、より詳細な性格分析と実用的なアドバイスをご覧いただけます
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Locked Content Cards */}
              <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => router.push(`/checkout/${sessionId}`)}
                    >
                      解除する（¥980）
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    強みと弱み
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">強み</h4>
                      <ul className="space-y-1">
                        {typeInfo.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            • {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">改善点</h4>
                      <ul className="space-y-1">
                        {typeInfo.weaknesses.map((weakness, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            • {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => router.push(`/checkout/${sessionId}`)}
                    >
                      解除する（¥980）
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-pink-500" />
                    人間関係のアドバイス
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">恋愛関係</h4>
                      <p className="text-sm text-gray-600">あなたのタイプに最適なパートナーシップの築き方...</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">友人関係</h4>
                      <p className="text-sm text-gray-600">長続きする友情を育むためのコツ...</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">職場での関係</h4>
                      <p className="text-sm text-gray-600">同僚や上司との効果的なコミュニケーション方法...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Premium CTA */}
            <Card className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
              <CardContent className="text-center py-12">
                <h3 className="text-3xl font-bold mb-4">完全版を今すぐ解除</h3>
                <p className="text-xl mb-6 opacity-90">詳細な分析、キャリアアドバイス、人間関係の指導まで</p>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="text-2xl font-bold">¥980</span>
                  <span className="text-lg opacity-75">（一回限り）</span>
                </div>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg"
                  onClick={() => router.push(`/checkout/${sessionId}`)}
                >
                  今すぐ解除する
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
