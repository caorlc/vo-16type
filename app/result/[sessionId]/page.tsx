"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Lock, Share2, RotateCcw, Star, Users, Briefcase, Heart } from "lucide-react"
import Link from "next/link"
import PremiumMask from "@/components/PremiumMask"

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
  INTP: {
    name: "論理学者",
    description: "革新的で好奇心旺盛な思想家",
    color: "bg-blue-500",
    traits: ["論理的思考", "独立性", "柔軟性", "好奇心"],
    careers: ["科学者", "プログラマー", "エンジニア", "戦略アナリスト"],
    strengths: ["分析力", "創造性", "客観性", "問題解決力"],
    weaknesses: ["感情表現", "優柔不断", "現実逃避", "社交性の低さ"],
  },
  // Add more types as needed
}

interface MBTIResult {
  type: keyof typeof mbtiTypes
  detail: Record<"EI"|"SN"|"TF"|"JP", { a: number, b: number }>
  timestamp: string
}

const typeDescriptions: Record<string, string> = {
  ENTP: `あなたの生き方の基本は外の世界に向けられており、直感を通して物事を捉えることが得意です。そして内面では、論理的で合理的に物事を整理する能力も持っています。`,
  INFP: `あなたの生き方の基本は外の世界に向けられており、直感を通して物事を捉えることが得意です。そして内面では、論理的で合理的に物事を整理する能力も持っています。`,
  // 其他类型可以继续补充
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

  const typeInfo = mbtiTypes[result.type] || mbtiTypes.INTJ
  const dimensions = [
    {
      left: "外向型",
      right: "内向型",
      leftKey: "E",
      rightKey: "I",
    },
    {
      left: "直感型",
      right: "現実型",
      leftKey: "N",
      rightKey: "S",
    },
    {
      left: "感情型",
      right: "思考型",
      leftKey: "F",
      rightKey: "T",
    },
    {
      left: "探索型",
      right: "計画型",
      leftKey: "P",
      rightKey: "J",
    },
    {
      left: "自己主張型",
      right: "激動型",
      leftKey: "A",
      rightKey: "T",
    },
  ];

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
              {typeDescriptions[result.type] && (
                <p className="mt-6 text-lg text-gray-700 whitespace-pre-line">
                  {typeDescriptions[result.type]}
                </p>
              )}
            </div>
            <img
              src={`/images/${result.type.toLowerCase()}.png`}
              alt={typeInfo.name}
              className="w-56 h-auto rounded-xl object-contain"
            />
          </div>

          {/* 概述2，仅保留这一部分 */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader className="pb-8">
              <CardDescription className="text-lg text-gray-700">
                外向的直感があなたの性格を支配しているため、ENTP型の人生における最大の関心事は「自分が生きているこの世界を理解すること」です。日々の生活で出会う様々な状況から、常にアイデアやイメージを吸収し続けています。この情報を直感で処理するあなたは、状況を素早く正確に把握する能力に長けています。同じ直感型のENFP型を除けば、ENTP型ほど環境を深く理解できるタイプは他にありません
              </CardDescription>
            </CardHeader>
          </Card>

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

          <section className="mb-8">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>性格特徴</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {[
                    "プロジェクト志向",
                    "アイデアと理論の創造を楽しむ",
                    "創造的で独創的",
                    "聡明で有能",
                    "柔軟で多様性に富む",
                    "優れたコミュニケーション能力",
                    "他の人との議論を楽しむ",
                    "優秀な対人スキル",
                    "天性のリーダーだが、人をコントロールすることは好まない",
                    "人にコントロールされることに抵抗する",
                    "活気に満ち、エネルギッシュで、他者を動機づけることができる",
                    "知識と能力を高く評価する",
                    "論理的で合理的な思考者",
                    "困難な概念や理論を理解することができる",
                    "困難な問題を解決することを楽しむ",
                    "制約のあるスケジュールや環境を嫌う",
                    "ルーティンワークや細かい作業を嫌う"
                  ].map((trait, idx) => (
                    <li key={idx} className="flex items-start text-base leading-snug">
                      <span className="text-green-500 mr-2 mt-0.5">✔</span>
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* 你的人际关系模块 */}
          <section className="mb-8">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-2xl">人間関係について</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">ENFJは人間関係に多大な努力と情熱を注ぎます。ある程度、ENFJは個人的な関係の親密さと真正性によって自分自身を定義し、そのため人間関係の営みに深く投資しています。彼らは非常に優れた対人スキルを持ち、愛情深く思いやりがあります。温かく肯定的で育成的です。他者の最良の部分を引き出し、温かくサポートすることに長けています。人間関係からの肯定的な反応を求めていますが、それを求めることには問題を抱えています。状況が要求する時には、ENFJは非常に鋭く批判的になります。要点を伝えた後は、自然な温かい自分に戻ります。愛する人を「過保護にする」傾向があるかもしれませんが、一般的に真の温かさと思いやりの性質で高く評価されています。</p>
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1">{`${result.type.toUpperCase()}の強み`}</h3>
                  <ul className="list-none space-y-1">
                    <li>🟢 優れた言語コミュニケーション能力</li>
                    <li>🟢 人々の思考と動機に対する非常に鋭い洞察力</li>
                    <li>🟢 動機づけ、インスピレーションを与える</li>
                    <li>🟢 他者の最良の部分を引き出す</li>
                    <li>🟢 温かく愛情深く肯定的</li>
                    <li>🟢 一緒にいて楽しい - 活発なユーモアのセンス、ドラマチック、エネルギッシュ、楽観的</li>
                    <li>🟢 優れた金銭管理能力</li>
                    <li>🟢 恋愛関係が失敗した後に「前に進む」ことができる（ただし自分を責める）</li>
                    <li>🟢 忠実で献身的 - 生涯にわたる関係を望む</li>
                    <li>🟢 「ウィン・ウィン」の状況を目指す</li>
                    <li>🟢 他者のニーズを満たすことに駆り立てられる</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{`${result.type.toUpperCase()}の弱み`}</h3>
                  <ul className="list-none space-y-1">
                    <li>🔴 過保護で窒息させる傾向</li>
                    <li>🔴 支配的および/または操作的になる傾向</li>
                    <li>🔴 自分自身のニーズに十分な注意を払わない</li>
                    <li>🔴 自分と一致しない意見や態度に対して批判的になる傾向</li>
                    <li>🔴 時として社会的適切性やプロトコルに気づかない</li>
                    <li>🔴 対立に極めて敏感で、回避戦術として物事を隠蔽する傾向</li>
                    <li>🔴 物事がうまくいかない時に自分を責める傾向があり、物事がうまくいく時に自分を評価しない</li>
                    <li>🔴 鋭く定義された価値システムにより、一部の分野で融通が利かない</li>
                    <li>🔴 社会的に受け入れられるまたは期待されることに非常に敏感で、社会的サークルが期待することの外で何かが「正しい」か「間違っている」かを評価できない場合がある</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* What does Success mean to an INFP? 模块 */}
          <section className="mb-8">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>{`${result.type.toUpperCase()}にとって成功とは何を意味するのでしょうか？`}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>ENFJは外部の人間的状況、主に他の人々によって動機づけられます。彼らの才能、ニーズ、願望、そして関心事がENFJの生きる世界を形成しています。ENFJは他者のために「物事を正しくする」ことができる時に繁栄し、人間の強みと能力を評価することで同僚、友人、家族を可能にし、力づけます。他者から受ける影響に直感的に自分の感情を適応させるENFJの追加能力に恵まれた時、ENFJはすべての人にとって最良の結果につながる協力的な道筋を見つける積極的な推進力を持ちます。ENFJにとっての成功は、人々のために物事を実現するプロセスへの関与を通じて、より大きな価値で人間世界を豊かにするために助けた人々の達成と満足を通じて、そして他者のための努力が自分自身の人生をも満たしたことを発見することを通じて得られます。</p>
              </CardContent>
            </Card>
          </section>

          {/* Allowing Your INFP Strengths to Flourish 模块 */}
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
                  <p>
                    ENFJとして、あなたは他のタイプにとって自然な強みではない、あなたの性格タイプに特有の才能を持っています。あなたの特別な才能を認識し、その成長と発展を促進することで、世界におけるあなたの居場所をより容易に見出し、自分の役割により満足するでしょう。
                    ほぼすべてのENFJは、自分自身の中に以下の特徴を認識するでしょう。彼らはこれらの強みを受け入れ、育むべきです：
                  </p>
                  <ul className="list-disc pl-4 mt-2">
                    <li>他者に価値と重要性を感じさせること</li>
                    <li>人間関係の状況における肯定的・否定的側面を素早く見抜くこと</li>
                    <li>自分の感情を明確に表現すること</li>
                    <li>パートナー、家族、同僚に対して忠誠心とコミットメントを提供すること</li>
                    <li>常に全員にとって有効な解決策を見つけようとすること</li>
                    <li>他者のユーモアと自己表現を促進すること</li>
                    <li>他者がニーズを満たすための方法を見つけること</li>
                    <li>肯定的なコミュニティ価値を確認すること</li>
                    <li>コミュニティにおいて自然にリーダーシップの役割を担うこと</li>
                  </ul>
                  <p className="mt-2">内向的直観を発達させ、自分の認識の中に可能性を見ることができる程度まで発達したENFJは、これらの非常に特別な才能を享受するでしょう：</p>
                  <ul className="list-disc pl-4 mt-2">
                    <li>他者の感情を理解し共感すること、「彼らがどこから来ているのか」を理解すること</li>
                    <li>平凡な物事や状況を魔法的なものに変える創造的表現の才能</li>
                    <li>周囲の世界とのつながりと感受性の高まった感覚</li>
                    <li>問題の多くの側面と、それが最善に解決される多くの方法を見る能力</li>
                    <li>一人で過ごす時間を創造的かつ価値のあるものにする能力</li>
                    <li>すべての物事間のスピリチュアルなつながりへの開放性</li>
                    <li>彼らはますます創造的で、先見性があり、共感的になり、そのため人生が提示するビジネス、人々、様々な状況の効果的で親切な管理者となります。</li>
                  </ul>
                </PremiumMask>
              </CardContent>
            </Card>
          </section>

          {/* Potential Problem Areas 模块 */}
          <section className="mb-8">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>潜在的な問題</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  どんな強みの才能にも、それに関連する弱さがあります。「悪い」がなければ、「良い」もありません。「困難」がなければ、「簡単」もありません。私たちは自分の強みを評価しますが、しばしば弱さを呪い、無視します。人として成長し、人生から望むものを得るためには、強みを活用するだけでなく、弱さと向き合い、それらに対処しなければなりません。それは、自分の性格タイプの潜在的な問題領域を厳しく見つめることを意味します。<br />
                  ENFJに見られる弱い特徴のほとんどは、支配的な外向的感情が外部世界で客観的価値と見なすものを過大評価し、それによって他者のニーズや外見によって過度に判断することに起因しています。これは主に、ENFJが内向的直観機能を十分に適応させておらず、自分自身の内在する根本的なニーズを見逃している可能性のある広範囲な方法を見分けることができず、そのような外見に惑わされているためです。ENFJは自然に価値と満足を見つけるために外向きに目を向けますが、関係性と快適さという主要なニーズを満たすためにはこの方向性を取ることが不可欠である一方で、十分に発達した直観機能の支持的なバランスがなければ、ENFJは外部世界を過大評価し、自分自身を見失い、人々や世界についての判断に固執するようになります。そのような場合、ENFJは硬直的で、他者にとってはやや非現実的な、明確な価値観の世界に住む傾向があり、それはしばしば「誇張された」または他の人々や人間関係の状況に強迫的につながっているように見えます。
                </p>
                <div className="relative mt-4">
                  <h3 className="font-semibold mb-2 text-lg">なぜこの問題を起こるか</h3>
                  <PremiumMask
                    title="今すぐロックを解除"
                    desc="このセクションでは、あなたの性格タイプが直面しやすい課題の根本原因を詳しく解説しています。詳細を読むにはプレミアム登録が必要です。"
                    buttonText="すべての結果のロックを解除"
                    onUnlockClick={scrollToUnlock}
                  >
                    <div>
                      上記で説明されている問題のある特徴のほぼすべては、あらゆるものに「適切な」価値を見つけたいというENFJの共通の問題に、様々な程度で起因することができます。ENFJが外部環境の人々や状況について善悪を素早く判断する外見の下を見る方法を学ばなければ、彼らは自分にとって良いと感じる判断を支持するためだけに内向的直観を使い、他の可能性だけでなく自分自身の内面生活の質も無視することになります。これらのあまり明らかでない可能性と自分自身のニーズを考慮するには、ENFJが自分の価値判断は実際に主観的であり、すべての文明人に一律に適用することは適切でも効果的でもないことを認識する必要があります。一歩下がって自分の価値体系を客観的に見る練習は、ENFJが慣れ親しんでいることではありません。問題とそれが引き起こす感情の抽象的な合理化を避けようとすることは、ENFJ人格にとって自然な生存技術です。<br />
                        ENFJ人格の主要な推進力は外向的感情であり、<br />
                        その目的は何よりも人々や人間関係の状況における価値を見つけ、識別することです。人や状況における特定の価値ある価値を見つける能力が脅かされると、ENFJは脅威となる力を遮断します。これは全く自然なことですが、残念ながら、この種のアジェンダ保護を定期的に行う個人は、人々に対する判断と期待においてますます硬直的になりますが、そのような状況が自分自身に与える影響についてはさらに関心を持たなくなります。バランスの取れていないENFJが直観のイメージに従う場合、これらは一般的に支配的な感情の主観的アジェンダを支持するように歪められます。このようにして、彼らは常に自分の決定と人々、物事、状況への自己犠牲の正当化を見つけ、他者の真の感情の現実を見つけることができず、自分の一見客観的な判断が自分自身と他者の人生や世俗的状況の根底にある理由と主観性を見逃していることにも興味を持たなくなります。<br />
                        機嫌の悪さ、物思いにふけること、他者に失望させられたという感覚は、しばしばこの世界への一方的なアプローチの最終結果となりますが、ENFJが強力な会社や関係のポジションにいる場合、状況や関与する他の人々にとっての真の価値に関係なく、自分の感情的ニーズと価値判断に合わせて他者や状況を操作することに駆り立てられるかもしれません。この場合、すべてにとって大きな価値があるとされる「大きな絵」は、道徳的優位性を主張することによって反対を消し去ったり押しつぶそうとする支配的な推進力となり、ENFJが「大義」のために自分の人生を犠牲にする点にまで至ります。感情が人生にもたらす主観的可能性の豊富さを認識できないことは、バランスの取れていないENFJから他者とのより深いつながりと、より繊細な判断が導くかもしれない自己理解と自己養育への道筋を洗練し発展させる可能性の両方へのアクセスを奪います。
                    </div>
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
                    <div>個人として成長するために、ENFJは自分の内なるイメージに注意を払うことに焦点を当てる必要があります。これは、自分の正しさの感覚と一致する価値の外見を単に受け入れるのではなく、自分の判断と価値の下にある可能性に対してオープンである必要があることを意味します。ENFJは、自分自身と他者の中にある主観的可能性を見る能力を発達させることは、正しい判断を下す能力を脅かすのではなく、むしろそれを向上させ、人生である程度の成功を達成する個人的なチャンスを高めることを理解する必要があります。
                    個人的成長に関心のあるENFJは、自分に来る価値を受け入れる動機に細心の注意を払うでしょう。彼らは自分自身と他者の価値判断の背後にある状況の背景を見ようとしているのか、それとも物事が「あるべき」姿についての自分のイメージを維持しようとしているのでしょうか？目標は、正しく価値があると思われることと、そのような判断が主観的であり、必ずしも自分や状況にとって最良ではない可能性がある多くの方法との間でバランスを見つけることです。明らかに、これは完全には可能ではありませんが、心に留めておくべき練習です。彼らは、脅威を感じることなく、また何が正しく何が間違っているかという感覚を失うことなく、自分に影響を与える価値の多くの異なるイメージとその対立を見る必要があります。</div>
                  </PremiumMask>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Ten Rules to Live By to Achieve INFP/ENTJ Success 模块 */}
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
                    1. 強みを活かそう！ あなたの意見が価値を認められる状況で、他者と関わる機会を必ず持つようにしましょう。<br />
                    2. 弱みと向き合おう！ いくつかの特性は強みであり、いくつかは弱みであることを理解し、受け入れましょう。弱みと向き合うことで、それらを克服でき、あなたに対する影響力を弱めることができます。<br />
                    3. 感情を表現しよう。 あなたの感情は、全体的な状況において他者の感情と同じくらい重要であることを理解しましょう。あなたの感情とニーズが価値を認められなければ、最良の結果は実現されません。ですから、他者の感情を大切にするのと同じくらい、自分の感情も大切にし、それについて語りましょう。<br />
                    4. 決断を下そう。 意見を持つことを恐れてはいけません。あなたが行動に値すると見なす資質と可能性を他者に示す必要があります。<br />
                    5. 批判に微笑みかけよう。 意見の相違や不和が人々の間の違いを示す理由を理解し、これを価値判断を成長に役立てる機会として活用しましょう。なぜなら、それがまさに価値判断の本質だからです。他者の批判に責任を感じようとせず、それを聞き、あなたの中に生まれる感情やイメージを理解しようとしましょう。そうすれば、合意への道だけでなく、共有された真に価値ある目標への道も見えてくるかもしれません。<br />
                    6. 他者を意識しよう。 あなたとは異なる見方をする他の15の性格タイプが存在することを忘れないでください。他者との問題の多くは、相手の視点を理解しようとすることで、より対処しやすくなります。<br />
                    7. 自分自身を意識しよう。 他者のために自分のニーズを過度に犠牲にしてはいけません。あなた自身が重要な焦点であることを理解しましょう。自分のニーズを満たさなければ、どうして効果的であり続けることができ、どうして他者があなたが自分の信念に忠実であることを知ることができるでしょうか？<br />
                    8. 期待は優しく持とう。 他者の価値を見ることは容易ですが、それを過度に強調すると相手を遠ざけてしまう可能性があります。相手の恐れや限界を理解していることを示し、あなたの感じ方を理解してもらえるよう優しく導きましょう：理解と愛へと優しく導いてください。<br />
                    9. 最善を想定しよう。 あなたの価値観が他者に理解されていないと感じて苦悩してはいけません－そんなことはありません。おそらく、それは相手の中にも根付く必要があるのです。状況が自然に解決されるのを待ち、愛こそが真の答えであることを信じ続けましょう。<br />
                    10. 迷った時は質問しよう！ フィードバックがないことを否定的なフィードバックと同じだと思い込んではいけません。フィードバックが必要でそれがない場合は、求めましょう。
                  </div>
                </PremiumMask>
              </CardContent>
            </Card>
          </section>
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
