import React from "react";

interface Feature {
  icon: string;
  title: string;
  content: string;
}
interface Celebrity {
  category: string;
  name: string;
}
interface PersonalityDetailProps {
  typeData: {
    name: string;
    description: string;
    overview: string;
    features: Feature[];
    celebrities: Celebrity[];
  };
  mbtiType: string;
}

const PersonalityDetail: React.FC<PersonalityDetailProps> = ({ typeData, mbtiType }) => {
  if (!typeData) return <div>未找到类型数据</div>;
  return (
    <div>
      {/* 标题和概述 */}
      <h1 className="text-3xl font-bold mb-2">{mbtiType.toUpperCase()}（{typeData.name}） 性格概括</h1>
      <p className="text-lg font-medium mb-6">{typeData.description}</p>
      <div className="bg-white rounded-xl shadow-md border px-6 py-4 mb-8">
        <p className="text-base whitespace-pre-line leading-loose">{typeData.overview}</p>
      </div>
      {/* 特征区块 */}
      <div className="space-y-6">
        {typeData.features.map((feature, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-semibold flex items-center mb-1">
              <span className="mr-2">{feature.icon}</span> {feature.title}
            </h2>
            <p>{feature.content}</p>
          </div>
        ))}
      </div>
      {/* 名人区块 */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">関連する有名人</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {typeData.celebrities.map((celebrity, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="font-bold">{celebrity.category}</span>
              <span className="text-base">{celebrity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalityDetail; 