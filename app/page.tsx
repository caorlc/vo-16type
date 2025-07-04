import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Brain, Target, Star } from "lucide-react"

const personalityTypes = [
  {
    id: "INTJ",
    name: "建築家",
    description: "独創的で戦略的な思考を持つ完璧主義者",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "INTP",
    name: "論理学者",
    description: "革新的な発明家で、知識への渇望が尽きない",
    color: "bg-blue-100 text-blue-800",
  },
  { id: "ENTJ", name: "指揮官", description: "大胆で想像力豊かな強力なリーダー", color: "bg-red-100 text-red-800" },
  { id: "ENTP", name: "討論者", description: "賢くて好奇心旺盛な思考家", color: "bg-orange-100 text-orange-800" },
  {
    id: "INFJ",
    name: "提唱者",
    description: "静かで神秘的だが、人々を鼓舞する理想主義者",
    color: "bg-green-100 text-green-800",
  },
  { id: "INFP", name: "仲介者", description: "詩的で親切で利他的な人", color: "bg-teal-100 text-teal-800" },
  {
    id: "ENFJ",
    name: "主人公",
    description: "カリスマ性があり、人々を鼓舞するリーダー",
    color: "bg-pink-100 text-pink-800",
  },
  { id: "ENFP", name: "運動家", description: "熱心で創造的で社交的な自由人", color: "bg-yellow-100 text-yellow-800" },
  { id: "ISTJ", name: "管理者", description: "実用的で事実重視の信頼できる人", color: "bg-gray-100 text-gray-800" },
  { id: "ISFJ", name: "擁護者", description: "非常に献身的で温かい保護者", color: "bg-indigo-100 text-indigo-800" },
  {
    id: "ESTJ",
    name: "幹部",
    description: "優秀な管理者で、物事や人々を管理することに長けている",
    color: "bg-red-100 text-red-800",
  },
  {
    id: "ESFJ",
    name: "領事",
    description: "非常に思いやりがあり、社交的で人気がある",
    color: "bg-rose-100 text-rose-800",
  },
  { id: "ISTP", name: "巨匠", description: "大胆で実用的な実験者", color: "bg-amber-100 text-amber-800" },
  { id: "ISFP", name: "冒険家", description: "柔軟で魅力的な芸術家", color: "bg-emerald-100 text-emerald-800" },
  {
    id: "ESTP",
    name: "起業家",
    description: "賢くてエネルギッシュで、非常に知覚的",
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "ESFP",
    name: "エンターテイナー",
    description: "自発的でエネルギッシュで熱心な人",
    color: "bg-purple-100 text-purple-800",
  },
]

const features = [
  {
    icon: Brain,
    title: "科学的根拠",
    description: "心理学者カール・ユングの理論に基づいた信頼性の高い性格診断",
  },
  {
    icon: Users,
    title: "16の性格タイプ",
    description: "あなたの個性を詳細に分析し、最適な性格タイプを特定",
  },
  {
    icon: Target,
    title: "実用的なアドバイス",
    description: "キャリア、人間関係、個人成長に役立つ具体的な提案",
  },
  {
    icon: Star,
    title: "詳細な分析",
    description: "強みと弱み、適職、相性の良いタイプまで詳しく解説",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MBTI診断</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              MBTIとは
            </Link>
            <Link href="/types" className="text-gray-600 hover:text-gray-900">
              16タイプ
            </Link>
            <Button variant="outline" size="sm">
              <Link href="/test">診断を始める</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              あなたの
              <span className="text-orange-500">本当の性格</span>
              を発見しよう
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              世界で最も信頼されているMBTI性格診断で、あなたの隠れた才能と可能性を見つけてください。
              <br />
              70の質問に答えるだけで、16の性格タイプからあなたにぴったりのタイプが分かります。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                <Link href="/test" className="flex items-center">
                  無料で診断を始める
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-gray-500">約10分で完了 • 完全無料</p>
            </div>

            {/* Personality Types Grid - 上移到这里 */}
            <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">16の性格タイプ</h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    あなたはどのタイプでしょうか？各タイプの特徴を見てみましょう
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {personalityTypes.map((type) => (
                    <Link key={type.id} href={`/personality/${type.id.toLowerCase()}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                        <CardHeader className="pb-2 flex flex-col items-center">
                          <div className="flex items-center justify-between">
                            <Badge className={type.color}>{type.id}</Badge>
                          </div>
                          <CardTitle className="text-lg group-hover:text-orange-500 transition-colors">{type.name}</CardTitle>
                          <CardDescription className="text-sm">{type.description}</CardDescription>
                          <img
                            src={"/images/entj.png"}
                            alt={`${type.id}の代表画像`}
                            width={48}
                            height={48}
                            className="mt-2 rounded-full object-cover"
                          />
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg">
                    <Link href="/types">すべてのタイプを詳しく見る</Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">なぜMBTI診断が選ばれるのか</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              科学的根拠に基づいた信頼性の高い性格診断で、あなたの真の姿を発見してください
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-orange-500" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">今すぐあなたの性格タイプを発見しよう</h2>
            <p className="text-xl text-orange-100 mb-8">
              数百万人が利用している信頼性の高いMBTI診断で、あなたの可能性を最大限に引き出してください
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              <Link href="/test" className="flex items-center">
                診断を始める（無料）
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  <Link href="/about" className="hover:text-white">
                    MBTIとは
                  </Link>
                </li>
                <li>
                  <Link href="/types" className="hover:text-white">
                    16タイプ
                  </Link>
                </li>
                <li>
                  <Link href="/test" className="hover:text-white">
                    診断を始める
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">サポート</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/faq" className="hover:text-white">
                    よくある質問
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    プライバシーポリシー
                  </Link>
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
    </div>
  )
}
