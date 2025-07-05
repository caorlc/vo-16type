import Image from "next/image";
// @ts-ignore
import personalityContent from "../../../data/personality-content.json";

export default function INTPPage() {
  const content = personalityContent.intp;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* 标题区 */}
      <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
      <div className="bg-white rounded-xl shadow-md border px-6 py-4 mb-8 mt-6">
        <p className="text-lg font-medium">
          {content.description}
        </p>
      </div>

      {/* 性格特征区 */}
      <div className="space-y-6">
        {content.features.map((feature: any, index: number) => (
          <div key={index}>
            <h2 className="text-xl font-semibold flex items-center">
              <span className="mr-2">{feature.icon}</span> {feature.title}
            </h2>
            <p>{feature.content}</p>
            {index === 0 && (
              <div className="my-8 flex justify-center">
                <Image src="/images/intp.png" alt="INTPイメージ" width={320} height={320} className="rounded-lg shadow-lg" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 名人区 */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">INTPの有名人</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {content.celebrities.map((celebrity: any, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <span className="font-bold">{celebrity.category}</span>
              <span className="text-base">{celebrity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 