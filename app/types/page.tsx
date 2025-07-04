import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Footer from "@/components/Footer"

const personalityTypes = [
  {
    type: "INTJ",
    name: "建築家",
    category: "分析家",
    description:
      "独創的で戦略的な思考を持つ完璧主義者。長期的な視野で物事を捉え、効率的なシステムを構築することを好みます。",
    traits: ["戦略的思考", "独立性", "完璧主義", "長期的視野"],
    careers: ["研究者", "エンジニア", "建築家", "戦略コンサルタント", "システムアナリスト"],
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
  },
  {
    type: "INTP",
    name: "論理学者",
    category: "分析家",
    description:
      "革新的な発明家で、知識への渇望が尽きません。理論的な概念を探求し、複雑な問題を解決することに喜びを感じます。",
    traits: ["論理的思考", "創造性", "独立性", "理論志向"],
    careers: ["科学者", "哲学者", "数学者", "プログラマー", "研究者"],
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
  },
  {
    type: "ENTJ",
    name: "指揮官",
    category: "分析家",
    description: "大胆で想像力豊かな強力なリーダー。困難な状況でも道を見つけ出し、チームを成功に導きます。",
    traits: ["リーダーシップ", "戦略的思考", "決断力", "効率性"],
    careers: ["CEO", "管理職", "起業家", "政治家", "軍事指導者"],
    color: "bg-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
  },
  {
    type: "ENTP",
    name: "討論者",
    category: "分析家",
    description: "賢くて好奇心旺盛な思考家。知的な挑戦を愛し、新しいアイデアや可能性を探求することに情熱を注ぎます。",
    traits: ["革新性", "柔軟性", "議論好き", "可能性追求"],
    careers: ["起業家", "コンサルタント", "発明家", "ジャーナリスト", "弁護士"],
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-800",
  },
  {
    type: "INFJ",
    name: "提唱者",
    category: "外交官",
    description:
      "静かで神秘的だが、人々を鼓舞する理想主義者。深い洞察力を持ち、他者の成長を支援することに喜びを感じます。",
    traits: ["理想主義", "洞察力", "共感力", "創造性"],
    careers: ["カウンセラー", "作家", "教師", "心理学者", "社会活動家"],
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
  },
  {
    type: "INFP",
    name: "仲介者",
    category: "外交官",
    description: "詩的で親切で利他的な人。自分の価値観に忠実で、他者の可能性を信じ、調和を重視します。",
    traits: ["理想主義", "創造性", "共感力", "価値観重視"],
    careers: ["作家", "カウンセラー", "芸術家", "社会活動家", "心理学者"],
    color: "bg-teal-500",
    bgColor: "bg-teal-50",
    textColor: "text-teal-800",
  },
  {
    type: "ENFJ",
    name: "主人公",
    category: "外交官",
    description: "カリスマ性があり、人々を鼓舞するリーダー。他者の成長を支援し、チームの調和を重視します。",
    traits: ["リーダーシップ", "共感力", "コミュニケーション", "人間関係"],
    careers: ["教師", "カウンセラー", "人事", "政治家", "宗教指導者"],
    color: "bg-pink-500",
    bgColor: "bg-pink-50",
    textColor: "text-pink-800",
  },
  {
    type: "ENFP",
    name: "運動家",
    category: "外交官",
    description: "熱心で創造的で社交的な自由人。人とのつながりを大切にし、新しい可能性を探求することに情熱を注ぎます。",
    traits: ["熱意", "創造性", "社交性", "柔軟性"],
    careers: ["ジャーナリスト", "俳優", "カウンセラー", "起業家", "広報"],
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
  },
  {
    type: "ISTJ",
    name: "管理者",
    category: "番人",
    description: "実用的で事実重視の信頼できる人。責任感が強く、伝統を重んじ、着実に目標を達成します。",
    traits: ["責任感", "実用性", "組織力", "伝統重視"],
    careers: ["会計士", "管理職", "銀行員", "公務員", "監査人"],
    color: "bg-gray-500",
    bgColor: "bg-gray-50",
    textColor: "text-gray-800",
  },
  {
    type: "ISFJ",
    name: "擁護者",
    category: "番人",
    description: "非常に献身的で温かい保護者。他者のニーズを敏感に察知し、サポートすることに喜びを感じます。",
    traits: ["献身性", "思いやり", "責任感", "協調性"],
    careers: ["看護師", "教師", "社会福祉士", "秘書", "カウンセラー"],
    color: "bg-indigo-500",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-800",
  },
  {
    type: "ESTJ",
    name: "幹部",
    category: "番人",
    description:
      "優秀な管理者で、物事や人々を管理することに長けています。効率性と結果を重視し、チームを成功に導きます。",
    traits: ["管理能力", "効率性", "決断力", "組織力"],
    careers: ["管理職", "軍人", "警察官", "銀行員", "プロジェクトマネージャー"],
    color: "bg-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
  },
  {
    type: "ESFJ",
    name: "領事",
    category: "番人",
    description:
      "非常に思いやりがあり、社交的で人気があります。他者の幸福を重視し、調和のとれた環境を作ることを好みます。",
    traits: ["思いやり", "社交性", "協調性", "責任感"],
    careers: ["教師", "看護師", "人事", "販売員", "イベントプランナー"],
    color: "bg-rose-500",
    bgColor: "bg-rose-50",
    textColor: "text-rose-800",
  },
  {
    type: "ISTP",
    name: "巨匠",
    category: "探検家",
    description: "大胆で実用的な実験者。手を使って物事を学び、問題解決に優れた能力を発揮します。",
    traits: ["実用性", "柔軟性", "問題解決", "独立性"],
    careers: ["エンジニア", "技術者", "パイロット", "整備士", "職人"],
    color: "bg-amber-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
  },
  {
    type: "ISFP",
    name: "冒険家",
    category: "探検家",
    description: "柔軟で魅力的な芸術家。美しいものを愛し、自分の価値観に従って生きることを重視します。",
    traits: ["芸術性", "柔軟性", "価値観重視", "思いやり"],
    careers: ["芸術家", "デザイナー", "音楽家", "写真家", "カウンセラー"],
    color: "bg-emerald-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-800",
  },
  {
    type: "ESTP",
    name: "起業家",
    category: "探検家",
    description: "賢くてエネルギッシュで、非常に知覚的。現在の瞬間を大切にし、実践的な解決策を見つけることが得意です。",
    traits: ["行動力", "適応力", "現実主義", "社交性"],
    careers: ["営業", "起業家", "スポーツ選手", "救急隊員", "エンターテイナー"],
    color: "bg-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-800",
  },
  {
    type: "ESFP",
    name: "エンターテイナー",
    category: "探検家",
    description: "自発的でエネルギッシュで熱心な人。人生を楽しみ、他者にも喜びをもたらすことを好みます。",
    traits: ["熱意", "社交性", "柔軟性", "楽観性"],
    careers: ["俳優", "音楽家", "販売員", "イベントプランナー", "教師"],
    color: "bg-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
  },
]

const categories = [
  { name: "分析家", description: "論理的で革新的な思考家", types: ["INTJ", "INTP", "ENTJ", "ENTP"] },
  { name: "外交官", description: "共感力があり理想主義的", types: ["INFJ", "INFP", "ENFJ", "ENFP"] },
  { name: "番人", description: "実用的で責任感が強い", types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"] },
  { name: "探検家", description: "柔軟で自発的な行動派", types: ["ISTP", "ISFP", "ESTP", "ESFP"] },
]

export default function TypesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">16の性格タイプ</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              4つの基本的な次元の組み合わせから生まれる16の異なる性格タイプ。 それぞれが独特の強みと特徴を持っています。
            </p>
          </div>

          {/* Categories Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map((category, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-center gap-2">
                    {category.types.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* All Types */}
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category.name}>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{category.name}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {personalityTypes
                    .filter((type) => category.types.includes(type.type))
                    .map((type) => (
                      <Card
                        key={type.type}
                        className={`${type.bgColor} border-0 shadow-lg hover:shadow-xl transition-shadow`}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between mb-4">
                            <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center`}>
                              <span className="text-white font-bold text-lg">{type.type}</span>
                            </div>
                            <Badge className={type.textColor} variant="secondary">
                              {type.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-2xl">{type.name}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">{type.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3">主な特徴</h4>
                            <div className="flex flex-wrap gap-2">
                              {type.traits.map((trait, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {trait}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">適職</h4>
                            <ul className="space-y-1">
                              {type.careers.slice(0, 3).map((career, index) => (
                                <li key={index} className="flex items-center text-sm">
                                  <div className={`w-2 h-2 ${type.color} rounded-full mr-3`} />
                                  {career}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Card className="mt-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">あなたはどのタイプ？</h2>
              <p className="text-xl mb-6 opacity-90">70の質問に答えて、あなたの真の性格タイプを発見しましょう</p>
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
      <Footer />
    </div>
  )
}
