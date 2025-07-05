export const runtime = 'edge';
import Image from "next/image";

export default function ISFPPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* 标题区 */}
      <h1 className="text-3xl font-bold mb-2">ISFP（占位）性格概括</h1>
      <div className="bg-white rounded-xl shadow-md border px-6 py-4 mb-8 mt-6">
        <p className="text-lg font-medium">
          这里是ISFP的性格概述占位文本。
        </p>
      </div>
      {/* 性格特征区 */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <span className="mr-2">🦄</span> 静かなるリーダーシップ
          </h2>
          <p>
            这里是ISFP的第一个段落占位文本。
          </p>
          <div className="my-8 flex justify-center">
            <Image src="/images/entj.png" alt="ISFPイメージ" width={320} height={320} className="rounded-lg shadow-lg" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <span className="mr-2">🧠</span> 内向的な思考家
          </h2>
          <p>
            这里是ISFP的第二个段落占位文本。
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <span className="mr-2">🦉</span> 論理的な判断者
          </h2>
          <p>
            这里是ISFP的第三个段落占位文本。
          </p>
        </div>
      </div>
      {/* 名人区 */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">有名なISFPタイプの人物</h2>
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