import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PremiumMask from "./PremiumMask";
import { Button } from "@/components/ui/button";

interface ResultDetailProps {
  typeData: any;
  mbtiType: string;
  premiumUnlocked: boolean;
  onUnlockClick: () => void;
}

export default function ResultDetail({ typeData, mbtiType, premiumUnlocked, onUnlockClick }: ResultDetailProps) {
  if (!typeData) return <div>未找到类型数据</div>;
  const typeInfo = typeData.basicInfo || { name: "未知のタイプ", description: "このタイプについての情報はまだ準備中です" };
  return (
    <div>
      {/* 性格特徴 */}
      {typeData.personalityTraits && typeData.overview && (
        <Card className="mb-8 border-0 shadow-xl">
          <CardHeader>
            <CardTitle>性格特徴</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 mb-4 whitespace-pre-line leading-loose">{typeData.overview}</p>
            <ul className="space-y-1">
              {typeData.personalityTraits.map((trait: string, idx: number) => (
                <li key={idx} className="flex items-start text-base leading-snug">
                  <span className="text-green-500 mr-2 mt-0.5">✔</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {/* 人际关系 */}
      {typeData.relationships && (
        <Card className="mb-8 border-0 shadow-xl">
          <CardHeader>
            <CardTitle>人間関係について</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 whitespace-pre-line leading-loose">{typeData.relationships.description}</p>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1">{`${mbtiType.toUpperCase()}の強み`}</h3>
              <ul className="list-none space-y-1">
                {typeData.relationships.strengths.map((strength: string, idx: number) => (
                  <li key={idx}>🟢 {strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{`${mbtiType.toUpperCase()}の弱み`}</h3>
              <ul className="list-none space-y-1">
                {typeData.relationships.weaknesses.map((weakness: string, idx: number) => (
                  <li key={idx}>🔴 {weakness}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
      {/* 成功定义 */}
      {typeData.success && (
        <Card className="mb-8 border-0 shadow-xl">
          <CardHeader>
            <CardTitle>{`${mbtiType.toUpperCase()}にとって成功とは何を意味するのでしょうか？`}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line leading-loose">{typeData.success}</p>
          </CardContent>
        </Card>
      )}
      {/* 強みを最大限に発揮する方法 */}
      {typeData.strengthsDevelopment && (
        <Card className="mb-8 border-0 shadow-xl">
          <CardHeader>
            <CardTitle>{`${mbtiType.toUpperCase()} の強みを最大限に発揮する方法`}</CardTitle>
          </CardHeader>
          <CardContent>
            <PremiumMask
              title="今すぐロックを解除"
              desc="フルレポートを取得して、あなたの性格タイプに合った課題の乗り越え方や成長のヒントを把握しましょう。"
              buttonText="すべての結果のロックを解除"
              onUnlockClick={onUnlockClick}
              unlocked={premiumUnlocked}
            >
                                  <p className="whitespace-pre-line leading-loose">{typeData.strengthsDevelopment.description}</p>
              <ul className="list-disc pl-4 mt-2">
                {typeData.strengthsDevelopment.basicStrengths.map((strength: string, idx: number) => (
                  <li key={idx}>{strength}</li>
                ))}
              </ul>
              {typeData.strengthsDevelopment.advancedStrengthsNote && (
                <div className="my-4 p-4 bg-orange-50 border-l-4 border-orange-400 text-base">
                  {typeData.strengthsDevelopment.advancedStrengthsNote}
                </div>
              )}
              {typeData.strengthsDevelopment.overview2 && <p className="mt-2">{typeData.strengthsDevelopment.overview2}</p>}
              {typeData.strengthsDevelopment.advancedStrengths && (
                <ul className="list-disc pl-4 mt-2">
                  {typeData.strengthsDevelopment.advancedStrengths.map((strength: string, idx: number) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              )}
            </PremiumMask>
          </CardContent>
        </Card>
      )}
      {/* 潜在的な問題 */}
      {typeData.potentialProblems && (
        <Card className="mb-8 border-0 shadow-xl">
          <CardHeader>
            <CardTitle>潜在的な問題</CardTitle>
          </CardHeader>
          <CardContent>
            {/* description + points 插入 */}
            {(() => {
              const desc = typeData.potentialProblems.description || '';
              const splitSentence = 'その結果、人によっては以下のような弱点が様々な形で現れることがあります。';
              const idx = desc.indexOf(splitSentence);
              if (idx !== -1) {
                const before = desc.slice(0, idx + splitSentence.length);
                const after = desc.slice(idx + splitSentence.length);
                return <>
                                          <p className="whitespace-pre-line leading-loose">{before}</p>
                  {typeData.potentialProblems.points && Array.isArray(typeData.potentialProblems.points) && (
                    <ul className="list-disc pl-6 mb-4">
                      {typeData.potentialProblems.points.map((point: string, idx: number) => (
                        <li key={idx} className="mb-1">{point}</li>
                      ))}
                    </ul>
                  )}
                                          {after && <p className="whitespace-pre-line leading-loose">{after}</p>}
                </>;
              } else {
                                  return <p className="whitespace-pre-line leading-loose">{desc}</p>;
              }
            })()}
            <div className="relative mt-4">
              <h3 className="font-semibold mb-2 text-lg">なぜこの問題を起こるか</h3>
              <PremiumMask
                title="今すぐロックを解除"
                desc="フルレポートを取得して、あなたの性格タイプが直面しやすい課題を理解することで、問題の予防が可能になります"
                buttonText="すべての結果のロックを解除"
                onUnlockClick={onUnlockClick}
                unlocked={premiumUnlocked}
              >
                                      <div className="whitespace-pre-line leading-loose">{typeData.potentialProblems.causes}</div>
              </PremiumMask>
            </div>
            <div className="relative mt-4">
              <h3 className="font-semibold mb-2 text-lg">解決方法</h3>
              <PremiumMask
                title="今すぐロックを解除"
                desc="ここでは、あなたの性格タイプに合った課題の乗り越え方や成長のヒントを紹介しています。理論だけでなく、日常生活で即座に実践できる実用的なアドバイスを学べます。"
                buttonText="すべての結果のロックを解除"
                onUnlockClick={onUnlockClick}
                unlocked={premiumUnlocked}
              >
                                      <div className="whitespace-pre-line leading-loose">{typeData.potentialProblems.solutions}</div>
              </PremiumMask>
            </div>
          </CardContent>
        </Card>
      )}
      {/* 幸福の鍵 */}
      {typeData.happinessKeys && (
        <Card className="mb-8 border-0 shadow-xl">
          <CardHeader>
            <CardTitle>{`${mbtiType.toUpperCase()}タイプとして、この世界で幸せに生きる鍵`}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line leading-loose text-gray-700">
              {typeData.happinessKeys}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 具体的アドバイス */}
      {typeData.specificSuggestions && (
        <Card className="mb-8 border-0 shadow-xl">
          <CardHeader>
            <CardTitle>具体的なアドバイス</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line leading-loose text-gray-700">
              {typeData.specificSuggestions}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 成功规则模块 */}
      {typeData.successRules && (
        <Card className="mb-8 border-0 shadow-xl">
          <CardHeader>
            <CardTitle>{` ${mbtiType.toUpperCase()} が成功を達成するために生きるべき10のルール`}</CardTitle>
          </CardHeader>
          <CardContent>
            <PremiumMask
              title="すべての結果のロックを解除"
              desc="あなたの性格に合わせた成功の秘訣をチェック！"
              buttonText="すべての結果のロックを解除"
              onUnlockClick={onUnlockClick}
              unlocked={premiumUnlocked}
            >
              <div>
                {typeData.successRules.map((rule: string, idx: number) => (
                  <div key={idx}>
                    {idx + 1}. {rule}<br />
                  </div>
                ))}
              </div>
            </PremiumMask>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 