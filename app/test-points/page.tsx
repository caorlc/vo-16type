"use client"

import resultData from '@/data/result.json'

export default function TestPointsPage() {
  const typeData = (resultData as Record<string, any>)['entp'];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">测试 Points 字段显示</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">typeData 信息：</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(typeData, null, 2)}
        </pre>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">potentialProblems 信息：</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(typeData?.potentialProblems, null, 2)}
        </pre>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">points 数组：</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(typeData?.potentialProblems?.points, null, 2)}
        </pre>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">description 文本：</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p className="whitespace-pre-line">{typeData?.potentialProblems?.description}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">字符串匹配测试：</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p>搜索字符串：その結果、人によっては以下のような弱点が様々な形で現れることがあります。</p>
          <p>匹配位置：{typeData?.potentialProblems?.description?.indexOf('その結果、人によっては以下のような弱点が様々な形で現れることがあります。')}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">渲染结果：</h2>
        <div className="bg-white border p-4 rounded">
          {(() => {
            const desc = typeData?.potentialProblems?.description || '';
            const splitSentence = 'その結果、人によっては以下のような弱点が様々な形で現れることがあります。';
            const idx = desc.indexOf(splitSentence);
            console.log('desc:', desc);
            console.log('splitSentence:', splitSentence);
            console.log('idx:', idx);
            console.log('points array:', typeData?.potentialProblems?.points);
            if (idx !== -1) {
              const before = desc.slice(0, idx + splitSentence.length);
              const after = desc.slice(idx + splitSentence.length);
              return <>
                <p className="whitespace-pre-line leading-loose">{before}</p>
                {typeData?.potentialProblems?.points && Array.isArray(typeData.potentialProblems.points) && (
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
        </div>
      </div>
    </div>
  )
} 