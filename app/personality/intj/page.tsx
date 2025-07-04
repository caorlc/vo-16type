import Image from "next/image";

export default function INTJPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* 标题区 */}
      <h1 className="text-3xl font-bold mb-2">INTJ（建築家）性格概括</h1>
      <div className="bg-white rounded-xl shadow-md border px-6 py-4 mb-8 mt-6">
        <p className="text-lg font-medium">
          独立心が強く戦略的思考に長けた完璧主義者で、自分のビジョンを実現するために論理的かつ計画的にアプローチする、稀有で有能な性格タイプです。
        </p>
      </div>

      {/* 性格特征区 */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <span className="mr-2">🦄</span> 静かなるリーダーシップ
          </h2>
          <p>
            建築家は生まれながらのリーダー気質を持っていますが、本当に必要だと感じるまでは表舞台に出ることを好まず、むしろ陰で支える役割を選ぶ傾向があります。しかし、いざリーダーシップを発揮する場面では、状況を冷静に見極め、問題のある部分を素早く改善できるため、非常に効果的なリーダーとなります。彼らは究極の戦略家であり、常に様々なアイデアや概念を検討し、現在の戦略と照らし合わせながら、あらゆる可能性に備えた計画を練っています。
          </p>
          <div className="my-8 flex justify-center">
            <Image src="/images/entj.png" alt="INTJイメージ" width={320} height={320} className="rounded-lg shadow-lg" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <span className="mr-2">🧠</span> 内向的な思考家
          </h2>
          <p>
            建築家は自分の内面世界で多くの時間を過ごすため、他人の考えや感情にはそれほど関心を示さないことがあります。感情面の発達が不十分な場合、人間関係において必要な親密さを築くことに苦労するかもしれません。また、感覚面が未発達だと、自分のアイデアを実現するために必要な細かい部分を見落としがちになる可能性があります。
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <span className="mr-2">🦉</span> 論理的な判断者
          </h2>
          <p>
            建築家が世界と関わる際の主な関心事は、的確な判断を下し、明確な意見を表明し、出会うすべての物事を論理的で理解しやすいシステムに組み込むことです。そのため、素早く判断を下す傾向があります。多くの場合、非常に鋭い直感を持ち、自分の考えが正しいという確信を抱いています。しかし、直感的な理解力を、自分の洞察を適切に伝える表現力で補えない場合、しばしば相手を軽視することになりがちです。このような状況では、建築家は誤解の原因を自分の表現不足ではなく、相手の理解力不足だと考えがちです。この傾向により、他人の意見を性急に退けたり、全般的に傲慢でエリート主義的な態度を取ったりすることがあります。
          </p>
        </div>
      </div>

      {/* 名人区 */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">有名なINTJタイプの人物</h2>
        <div className="flex space-x-6">
          <div className="flex flex-col items-center">
            <Image src="/images/elon-musk.jpg" alt="Elon Musk" width={96} height={96} className="rounded-full mb-2" />
            <span className="font-medium">イーロン・マスク</span>
            <span className="text-sm text-gray-500">起業家・エンジニア</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/images/zuckerberg.jpg" alt="Mark Zuckerberg" width={96} height={96} className="rounded-full mb-2" />
            <span className="font-medium">マーク・ザッカーバーグ</span>
            <span className="text-sm text-gray-500">Meta創業者</span>
          </div>
        </div>
      </div>
    </div>
  );
}
