"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight,
  Star,
  Users,
  Briefcase,
  Heart,
  TrendingUp,
  Shield,
  Lightbulb,
  Target,
  MessageCircle,
  BookOpen,
  Award,
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const personalityData = {
  intj: {
    type: "INTJ",
    name: "建築家",
    subtitle: "独創的で戦略的な思考を持つ完璧主義者",
    description:
      "INTJは「建築家」と呼ばれ、独創的で戦略的な思考を持つ完璧主義者です。長期的な視野で物事を捉え、効率的なシステムを構築することを好みます。内向的でありながら強い意志を持ち、自分の理想を現実化するために努力し続けます。",
    color: "bg-purple-500",
    bgGradient: "from-purple-500 to-indigo-600",
    lightBg: "bg-purple-50",
    textColor: "text-purple-800",
    percentage: "2-4%",

    strengths: ["戦略的思考力", "独立性と自律性", "長期的視野", "完璧主義的品質", "論理的分析力", "革新的アイデア"],

    weaknesses: [
      "感情表現の苦手さ",
      "柔軟性の欠如",
      "批判的すぎる傾向",
      "チームワークの困難",
      "細かい作業への不耐性",
      "社交的場面での不快感",
    ],

    careers: [
      { category: "研究・開発", jobs: ["研究者", "科学者", "エンジニア", "建築家"] },
      {
        category: "戦略・コンサルティング",
        jobs: ["戦略コンサルタント", "システムアナリスト", "プロジェクトマネージャー"],
      },
      { category: "技術・IT", jobs: ["ソフトウェア開発者", "データサイエンティスト", "システム設計者"] },
      { category: "学術・教育", jobs: ["大学教授", "研究員", "専門分野の講師"] },
    ],

    relationships: {
      romantic:
        "INTJは恋愛において真剣で献身的です。表面的な関係よりも深いつながりを求め、パートナーとの知的な交流を重視します。感情表現は苦手ですが、愛情は行動で示します。",
      friendship:
        "少数の親しい友人を持つことを好みます。知的な議論や共通の興味を持つ人との関係を大切にし、表面的な付き合いは避ける傾向があります。",
      workplace:
        "独立して作業することを好み、明確な目標と自由度がある環境で最高のパフォーマンスを発揮します。チームリーダーとしては、効率性と結果を重視します。",
    },

    growth: [
      "感情的知性の向上：他者の感情をより理解し、共感力を育てる",
      "柔軟性の開発：計画通りに行かない状況への適応力を身につける",
      "コミュニケーション改善：自分のアイデアをより効果的に伝える方法を学ぶ",
      "チームワーク強化：他者との協力関係を築くスキルを向上させる",
    ],

    compatibleTypes: ["ENFP", "ENTP", "INFJ", "INTJ"],
    challengingTypes: ["ESFP", "ISFP", "ESFJ", "ISFJ"],

    famousPeople: ["イーロン・マスク", "マーク・ザッカーバーグ", "ニコラ・テスラ", "スティーブン・ホーキング"],

    dimensions: [
      { name: "内向性 (I)", value: 85, description: "エネルギーを内面から得る" },
      { name: "直感 (N)", value: 90, description: "可能性とパターンに注目" },
      { name: "思考 (T)", value: 88, description: "論理的分析を重視" },
      { name: "判断 (J)", value: 92, description: "計画的で決断を好む" },
    ],
  },

  infp: {
    type: "INFP",
    name: "仲介者",
    subtitle: "詩的で親切で利他的な人",
    description:
      "INFPは「仲介者」と呼ばれ、詩的で親切で利他的な性格を持ちます。自分の価値観に忠実で、他者の可能性を信じ、調和を重視します。創造性に富み、理想主義的な視点で世界を見つめています。",
    color: "bg-teal-500",
    bgGradient: "from-teal-500 to-green-600",
    lightBg: "bg-teal-50",
    textColor: "text-teal-800",
    percentage: "4-5%",

    strengths: [
      "強い価値観と信念",
      "創造性と想像力",
      "深い共感力",
      "柔軟性と適応力",
      "他者への思いやり",
      "理想主義的視点",
    ],

    weaknesses: [
      "現実的判断の困難",
      "批判への過敏さ",
      "決断の遅さ",
      "完璧主義的傾向",
      "組織運営の苦手さ",
      "ストレス耐性の低さ",
    ],

    careers: [
      { category: "創作・芸術", jobs: ["作家", "詩人", "芸術家", "デザイナー"] },
      { category: "支援・カウンセリング", jobs: ["カウンセラー", "心理学者", "社会福祉士"] },
      { category: "教育・研究", jobs: ["教師", "研究者", "図書館司書"] },
      { category: "社会活動", jobs: ["NGO職員", "社会活動家", "環境保護活動家"] },
    ],

    relationships: {
      romantic:
        "INFPは恋愛において深い感情的つながりを求めます。パートナーの成長を支援し、真の理解を重視します。理想が高く、完璧な関係を求める傾向があります。",
      friendship:
        "真の友情を大切にし、深いレベルでの理解を求めます。表面的な関係よりも、価値観を共有できる少数の親友を好みます。",
      workplace:
        "価値観に合致する仕事環境で最高のパフォーマンスを発揮します。創造性を発揮できる自由度と、他者を助ける機会がある職場を好みます。",
    },

    growth: [
      "現実的思考の向上：理想と現実のバランスを取る能力を育てる",
      "決断力の強化：完璧を求めすぎず、適切なタイミングで決断する",
      "ストレス管理：批判や対立に対する耐性を向上させる",
      "組織スキル：目標達成のための計画性を身につける",
    ],

    compatibleTypes: ["ENFJ", "INFJ", "ENFP", "INFP"],
    challengingTypes: ["ESTJ", "ENTJ", "ESTP", "ESFJ"],

    famousPeople: [
      "J.R.R.トールキン",
      "ウィリアム・シェイクスピア",
      "ジョニー・デップ",
      "ヴィンセント・ファン・ゴッホ",
    ],

    dimensions: [
      { name: "内向性 (I)", value: 80, description: "エネルギーを内面から得る" },
      { name: "直感 (N)", value: 85, description: "可能性とパターンに注目" },
      { name: "感情 (F)", value: 90, description: "価値観と人への影響を重視" },
      { name: "知覚 (P)", value: 88, description: "柔軟で選択肢を保つ" },
    ],
  },

  enfj: {
    type: "ENFJ",
    name: "主人公",
    subtitle: "カリスマ性があり、人々を鼓舞するリーダー",
    description:
      "ENFJは「主人公」と呼ばれ、カリスマ性があり人々を鼓舞するリーダーです。他者の成長を支援し、チームの調和を重視します。優れたコミュニケーション能力を持ち、人々の可能性を引き出すことに長けています。",
    color: "bg-pink-500",
    bgGradient: "from-pink-500 to-rose-600",
    lightBg: "bg-pink-50",
    textColor: "text-pink-800",
    percentage: "2-3%",

    strengths: [
      "優れたリーダーシップ",
      "強い共感力",
      "コミュニケーション能力",
      "他者への献身性",
      "組織運営能力",
      "インスピレーション力",
    ],

    weaknesses: [
      "自己犠牲的傾向",
      "批判への敏感さ",
      "完璧主義",
      "燃え尽き症候群のリスク",
      "個人的ニーズの軽視",
      "対立回避傾向",
    ],

    careers: [
      { category: "教育・指導", jobs: ["教師", "教授", "研修講師", "コーチ"] },
      { category: "カウンセリング・支援", jobs: ["カウンセラー", "心理学者", "ソーシャルワーカー"] },
      { category: "人事・組織開発", jobs: ["人事マネージャー", "組織開発コンサルタント", "採用担当"] },
      { category: "政治・社会活動", jobs: ["政治家", "外交官", "NGO代表", "宗教指導者"] },
    ],

    relationships: {
      romantic:
        "ENFJは恋愛において献身的で支援的なパートナーです。相手の成長を促し、深い感情的つながりを築きます。時として自分のニーズを後回しにしがちです。",
      friendship:
        "多くの人との関係を築くのが得意で、友人の相談役になることが多いです。他者の問題解決に積極的に関わり、支援を提供します。",
      workplace:
        "チームの調和を重視し、メンバーの能力を最大限に引き出すリーダーシップを発揮します。人材育成と組織文化の構築に優れています。",
    },

    growth: [
      "自己ケアの重要性：他者への献身と自分のニーズのバランスを取る",
      "境界線の設定：すべての人を助けようとせず、適切な限界を設ける",
      "批判への対処：建設的な批判を成長の機会として受け入れる",
      "個人時間の確保：内省と充電のための時間を意識的に作る",
    ],

    compatibleTypes: ["INFP", "ISFP", "ENFJ", "INFJ"],
    challengingTypes: ["ISTP", "INTP", "ESTP", "ENTP"],

    famousPeople: [
      "オプラ・ウィンフリー",
      "バラク・オバマ",
      "マルティン・ルーサー・キング・ジュニア",
      "マヤ・アンジェロウ",
    ],

    dimensions: [
      { name: "外向性 (E)", value: 85, description: "他者との交流からエネルギーを得る" },
      { name: "直感 (N)", value: 82, description: "可能性とパターンに注目" },
      { name: "感情 (F)", value: 92, description: "価値観と人への影響を重視" },
      { name: "判断 (J)", value: 88, description: "計画的で決断を好む" },
    ],
  },

  entp: {
    type: "ENTP",
    name: "討論者",
    subtitle: "賢くて好奇心旺盛な思考家",
    description:
      "ENTPは「討論者」と呼ばれ、賢くて好奇心旺盛な思考家です。知的な挑戦を愛し、新しいアイデアや可能性を探求することに情熱を注ぎます。革新的で柔軟性があり、議論を通じて真実を追求します。",
    color: "bg-orange-500",
    bgGradient: "from-orange-500 to-red-600",
    lightBg: "bg-orange-50",
    textColor: "text-orange-800",
    percentage: "2-3%",

    strengths: [
      "革新的思考力",
      "優れた適応力",
      "コミュニケーション能力",
      "問題解決スキル",
      "創造性と想像力",
      "エネルギッシュな行動力",
    ],

    weaknesses: [
      "継続性の欠如",
      "細かい作業への不耐性",
      "ルーティンワークの苦手さ",
      "感情的配慮の不足",
      "計画性の欠如",
      "集中力の散漫さ",
    ],

    careers: [
      { category: "起業・イノベーション", jobs: ["起業家", "イノベーションマネージャー", "ベンチャーキャピタリスト"] },
      { category: "コンサルティング", jobs: ["経営コンサルタント", "戦略アドバイザー", "変革コンサルタント"] },
      { category: "創作・メディア", jobs: ["発明家", "ジャーナリスト", "広告クリエイター"] },
      { category: "法律・政治", jobs: ["弁護士", "政治家", "外交官", "交渉人"] },
    ],

    relationships: {
      romantic:
        "ENTPは恋愛において刺激的で楽しいパートナーです。知的な議論と新しい体験を共有することを好みます。時として感情的なニーズへの配慮が不足することがあります。",
      friendship:
        "多様な友人関係を築き、活発な議論と新しいアイデアの交換を楽しみます。社交的で魅力的な性格により、多くの人に愛されます。",
      workplace:
        "革新的なプロジェクトやブレインストーミングで力を発揮します。チームに新しい視点をもたらし、創造的な解決策を提案します。",
    },

    growth: [
      "継続力の向上：プロジェクトを最後まで完遂する習慣を身につける",
      "感情的知性の発達：他者の感情により敏感になり、配慮を示す",
      "計画性の強化：目標達成のための具体的な計画を立てる能力を育てる",
      "集中力の改善：重要なタスクに焦点を当てる技術を習得する",
    ],

    compatibleTypes: ["INFJ", "INTJ", "ENFP", "ENTP"],
    challengingTypes: ["ISFJ", "ISTJ", "ESFJ", "ESTJ"],

    famousPeople: [
      "スティーブ・ジョブズ",
      "ベンジャミン・フランクリン",
      "トーマス・エジソン",
      "リチャード・ファインマン",
    ],

    dimensions: [
      { name: "外向性 (E)", value: 88, description: "他者との交流からエネルギーを得る" },
      { name: "直感 (N)", value: 95, description: "可能性とパターンに注目" },
      { name: "思考 (T)", value: 85, description: "論理的分析を重視" },
      { name: "知覚 (P)", value: 90, description: "柔軟で選択肢を保つ" },
    ],
  },
}

export default function PersonalityPage() {
  const params = useParams()
  const typeKey = params.type as string
  const data = personalityData[typeKey as keyof typeof personalityData]

  if (!data) {
    return <div>ページが見つかりません</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className={`py-20 bg-gradient-to-r ${data.bgGradient} text-white`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`w-32 h-32 ${data.color} rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl`}
            >
              <span className="text-5xl font-bold text-white">{data.type}</span>
            </div>
            <img
              src="/images/16types/entj.png"
              alt={`${data.type}の代表画像`}
              width={160}
              height={160}
              className="mx-auto mb-6 rounded-full shadow-lg object-cover"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{data.name}</h1>
            <p className="text-2xl mb-6 opacity-90">{data.subtitle}</p>
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 text-white border-white/30">
              人口の約 {data.percentage}
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Description */}
          <Card className="mb-12 border-0 shadow-xl">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-gray-700">{data.description}</p>
            </CardContent>
          </Card>

          {/* Personality Dimensions */}
          <Card className="mb-12 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="w-6 h-6 mr-2 text-blue-500" />
                性格の傾向
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.dimensions.map((dimension, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-lg">{dimension.name}</span>
                    <span className="text-sm text-gray-600">{dimension.value}%</span>
                  </div>
                  <Progress value={dimension.value} className="h-4 mb-2" />
                  <p className="text-sm text-gray-600">{dimension.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Strengths and Weaknesses */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-green-600">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  強み
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-orange-600">
                  <Shield className="w-5 h-5 mr-2" />
                  改善点
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <Lightbulb className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Career Paths */}
          <Card className="mb-12 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Briefcase className="w-6 h-6 mr-2 text-purple-500" />
                適職・キャリアパス
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {data.careers.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-lg mb-4 text-purple-600">{category.category}</h3>
                    <ul className="space-y-2">
                      {category.jobs.map((job, jobIndex) => (
                        <li key={jobIndex} className="flex items-center">
                          <div className={`w-2 h-2 ${data.color} rounded-full mr-3`} />
                          <span className="text-gray-700">{job}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Relationships */}
          <Card className="mb-12 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Heart className="w-6 h-6 mr-2 text-pink-500" />
                人間関係
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  恋愛関係
                </h3>
                <p className="text-gray-700 leading-relaxed">{data.relationships.romantic}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  友人関係
                </h3>
                <p className="text-gray-700 leading-relaxed">{data.relationships.friendship}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-green-500" />
                  職場での関係
                </h3>
                <p className="text-gray-700 leading-relaxed">{data.relationships.workplace}</p>
              </div>
            </CardContent>
          </Card>

          {/* Compatibility */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-green-600">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  相性の良いタイプ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {data.compatibleTypes.map((type, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-200">
                      {type}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-orange-600">
                  <Target className="w-5 h-5 mr-2" />
                  挑戦的な関係
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {data.challengingTypes.map((type, index) => (
                    <Badge key={index} className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                      {type}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personal Growth */}
          <Card className="mb-12 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <BookOpen className="w-6 h-6 mr-2 text-indigo-500" />
                個人成長のアドバイス
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {data.growth.map((advice, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="w-5 h-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{advice}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Famous People */}
          <Card className="mb-12 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                同じタイプの有名人
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.famousPeople.map((person, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-800">{person}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className={`bg-gradient-to-r ${data.bgGradient} text-white border-0`}>
            <CardContent className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">あなたも{data.name}タイプ？</h2>
              <p className="text-xl mb-6 opacity-90">正確な診断で、あなたの真の性格タイプを発見してください</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg"
                >
                  <Link href="/test" className="flex items-center">
                    無料で診断を始める
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                >
                  <Link href="/types">他のタイプを見る</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
