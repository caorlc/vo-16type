import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, Target, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const mbtiDimensions = [
  {
    title: "外向性 (E) vs 内向性 (I)",
    description: "エネルギーの向かう方向",
    extrovert: "外向性：他者との交流からエネルギーを得る",
    introvert: "内向性：内面の世界からエネルギーを得る",
  },
  {
    title: "感覚 (S) vs 直感 (N)",
    description: "情報の受け取り方",
    extrovert: "感覚：具体的な事実や詳細に注目する",
    introvert: "直感：可能性やパターンに注目する",
  },
  {
    title: "思考 (T) vs 感情 (F)",
    description: "意思決定の方法",
    extrovert: "思考：論理的分析を重視する",
    introvert: "感情：価値観や人への影響を重視する",
  },
  {
    title: "判断 (J) vs 知覚 (P)",
    description: "外界への対応方法",
    extrovert: "判断：計画的で決断を好む",
    introvert: "知覚：柔軟で選択肢を保つ",
  },
]

const personalityTypes = [
  { type: "INTJ", name: "建築家", category: "分析家", color: "bg-purple-100 text-purple-800" },
  { type: "INTP", name: "論理学者", category: "分析家", color: "bg-purple-100 text-purple-800" },
  { type: "ENTJ", name: "指揮官", category: "分析家", color: "bg-purple-100 text-purple-800" },
  { type: "ENTP", name: "討論者", category: "分析家", color: "bg-purple-100 text-purple-800" },
  { type: "INFJ", name: "提唱者", category: "外交官", color: "bg-green-100 text-green-800" },
  { type: "INFP", name: "仲介者", category: "外交官", color: "bg-green-100 text-green-800" },
  { type: "ENFJ", name: "主人公", category: "外交官", color: "bg-green-100 text-green-800" },
  { type: "ENFP", name: "運動家", category: "外交官", color: "bg-green-100 text-green-800" },
  { type: "ISTJ", name: "管理者", category: "番人", color: "bg-blue-100 text-blue-800" },
  { type: "ISFJ", name: "擁護者", category: "番人", color: "bg-blue-100 text-blue-800" },
  { type: "ESTJ", name: "幹部", category: "番人", color: "bg-blue-100 text-blue-800" },
  { type: "ESFJ", name: "領事", category: "番人", color: "bg-blue-100 text-blue-800" },
  { type: "ISTP", name: "巨匠", category: "探検家", color: "bg-orange-100 text-orange-800" },
  { type: "ISFP", name: "冒険家", category: "探検家", color: "bg-orange-100 text-orange-800" },
  { type: "ESTP", name: "起業家", category: "探検家", color: "bg-orange-100 text-orange-800" },
  { type: "ESFP", name: "エンターテイナー", category: "探検家", color: "bg-orange-100 text-orange-800" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">16タイプ性格診断とは？</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              世界で最も信頼されている16タイプ性格診断で、あなたの隠れた才能と可能性を見つけてください。
              <br />
            </p>
          </div>

          {/* Theory Section */}
          <Card className="mb-12 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Brain className="w-6 h-6 mr-2 text-purple-500" />
                理論的背景
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                16タイプ性格診断は、スイスの心理学者カール・グスタフ・ユングの心理学的類型論を基礎として、
                キャサリン・クック・ブリッグスとその娘イザベル・ブリッグス・マイヤーズによって開発されました。
              </p>
              <p className="text-gray-700 leading-relaxed">
                この診断では、人の性格を4つの基本的な次元で分類し、16の異なる性格タイプを特定します。
                各次元は対立する2つの選好を表し、個人がどちらの傾向により強く引かれるかを測定します。
              </p>
            </CardContent>
          </Card>

          {/* Dimensions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">4つの性格次元</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {mbtiDimensions.map((dimension, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">{dimension.title}</CardTitle>
                    <CardDescription>{dimension.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">{dimension.extrovert}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">{dimension.introvert}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 16 Types Overview */}
          <Card className="mb-12 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Users className="w-6 h-6 mr-2 text-blue-500" />
                16の性格タイプ
              </CardTitle>
              <CardDescription>4つの次元の組み合わせから生まれる16の異なる性格タイプ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {personalityTypes.map((type) => (
                  <div key={type.type} className="text-center p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <Badge className={`${type.color} mb-2`}>{type.type}</Badge>
                    <h3 className="font-semibold text-sm mb-1">{type.name}</h3>
                    <p className="text-xs text-gray-600">{type.category}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scientific Validity */}
          <Card className="mb-12 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="w-6 h-6 mr-2 text-green-500" />
                科学的信頼性
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                16タイプ性格診断は70年以上にわたって研究・改良され続けており、世界中で多くの人々からが受検しています。 Fortune
                100企業の89%が16タイプ性格診断を人材開発に活用しており、その有効性が実証されています。
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">70+</div>
                  <p className="text-sm text-blue-800">年の研究実績</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">200万+</div>
                  <p className="text-sm text-green-800">年間受検者数</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
                  <p className="text-sm text-purple-800">Fortune 100企業の採用率</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Guidelines */}
          <Card className="mb-12 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <BookOpen className="w-6 h-6 mr-2 text-orange-500" />
                診断結果の活用方法
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-green-600">推奨される使用法</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" />
                      自己理解と個人成長のツールとして
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" />
                      キャリア選択の参考として
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" />
                      チームワーク向上のために
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2" />
                      コミュニケーション改善のために
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-red-600">注意事項</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2" />
                      人を固定的に分類するものではない
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2" />
                      採用選考の唯一の基準にしない
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2" />
                      能力や成功を予測するものではない
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2" />
                      時間とともに変化する可能性がある
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">あなたの性格タイプを発見しよう</h2>
              <p className="text-xl mb-6 opacity-90">
                科学的根拠に基づいた信頼性の高い診断で、真の自分を知る第一歩を踏み出しましょう
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg"
              >
                <Link href="/test">無料で診断を始める</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
