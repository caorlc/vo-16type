import { Metadata } from 'next';
import personalityData from '@/data/personality.json';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PersonalityAxisBar from '@/components/PersonalityAxisBar';

interface Feature {
  icon: string;
  title: string;
  content: string;
}
interface Celebrity {
  category: string;
  name: string;
}

// 生成静态页面参数
export async function generateStaticParams() {
  const types = Object.keys(personalityData);
  return types.map((type) => ({
    type: type,
  }));
}

// 动态生成metadata
export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
  const type = params.type?.toLowerCase();
  const data = (personalityData as any)[type];
  
  if (!data) {
    return {
      title: 'ページが見つかりません | 16タイプ性格診断',
    };
  }

  const title = `${type.toUpperCase()}（${data.name}）の性格タイプ | 16タイプ性格診断`;
  const description = `${type.toUpperCase()}（${data.name}）の性格特徴、強み、弱み、適職、有名人を詳しく解説。${data.description}。16タイプ性格診断でENTP型の詳細分析をご覧ください。`;
  const keywords = `${type.toUpperCase()}, ${data.name}, 16タイプ, 性格診断, MBTI, 性格タイプ, 討論者, 革新的, 議論好き, 柔軟性`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://www.my16type.com/personality/${type}`,
      siteName: '16タイプ性格診断',
      locale: 'ja_JP',
      type: 'article',
      images: [
        {
          url: `/images/${type}.png`,
          width: 400,
          height: 400,
          alt: `${type.toUpperCase()}（${data.name}）の性格タイプ`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/images/${type}.png`],
    },
    alternates: {
      canonical: `/personality/${type}`,
    },
  };
}

// 生成结构化数据
function generateStructuredData(type: string, data: any) {
  const celebrities = data.celebrities?.map((c: Celebrity) => c.name).join(', ') || '';
  
  const mainStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${type.toUpperCase()}（${data.name}）の性格タイプ`,
    description: data.description,
    image: `https://www.my16type.com/images/${type}.png`,
    author: {
      '@type': 'Organization',
      name: '16タイプ性格診断',
    },
    publisher: {
      '@type': 'Organization',
      name: '16タイプ性格診断',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.my16type.com/logo.svg',
      },
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.my16type.com/personality/${type}`,
    },
    about: {
      '@type': 'Thing',
      name: '16タイプ性格診断',
      description: 'MBTI性格診断',
    },
    mentions: celebrities ? celebrities.split(', ') : [],
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `${type.toUpperCase()}型の特徴は何ですか？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${type.toUpperCase()}型は${data.description}です。${data.features?.[0]?.content}`
        }
      },
      {
        '@type': 'Question',
        name: `${type.toUpperCase()}型に適した職業は？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${type.toUpperCase()}型は${data.features?.map(f => f.title).join('、')}などの特徴を活かせる職業が適しています。特に創造性や柔軟性を求められる分野で活躍できる可能性が高いです。`
        }
      },
      {
        '@type': 'Question',
        name: `${type.toUpperCase()}型の有名人は誰ですか？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${type.toUpperCase()}型の有名人には${data.celebrities?.map(c => `${c.name}（${c.category}）`).join('、')}などがいます。これらの人々の成功は${type.toUpperCase()}型の特徴を活かした結果と言えるでしょう。`
        }
      },
      {
        '@type': 'Question',
        name: `${type.toUpperCase()}型の強みと弱みは？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `強み：${data.features?.map(f => f.title).join('、')}などが挙げられます。弱み：完璧主義的になりすぎたり、他者の感情に鈍感になりがちな面があります。`
        }
      }
    ]
  };

  return [mainStructuredData, faqStructuredData];
}

export default function PersonalityPage({ params }: { params: { type: string } }) {
  const type = params.type?.toLowerCase();
  const data = (personalityData as any)[type];
  
  if (!data) return notFound();

  const [mainStructuredData, faqStructuredData] = generateStructuredData(type, data);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 面包屑导航 */}
        <nav className="text-sm text-gray-600 mb-6" aria-label="パンくずリスト">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-orange-500">ホーム</a></li>
            <li>/</li>
            <li><a href="/personality" className="hover:text-orange-500">16タイプ一覧</a></li>
            <li>/</li>
            <li className="text-gray-900">{type.toUpperCase()}（{data.name}）</li>
          </ol>
        </nav>

        {/* 主要内容区域 */}
        <main>
          {/* 标题和描述 */}
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {type.toUpperCase()}（{data.name}）の性格タイプ
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {data.description}
            </p>
          </header>

          {/* 性格类型图片 */}
          <div className="flex justify-center mb-8">
            <Image
              src={`/images/${type}.png`}
              alt={`${type.toUpperCase()}（${data.name}）の性格タイプ画像`}
              width={200}
              height={200}
              className="w-48 h-48 object-contain"
              priority
            />
          </div>

          {/* 详细描述 */}
          <section className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {type.toUpperCase()}型の詳細解説
            </h2>
            <div className="text-gray-800 leading-relaxed">
              {data.overview}
            </div>
          </section>

          {/* 特征卡片 */}
          <section className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              {type.toUpperCase()}型の主な特徴
            </h2>
            <div className="grid md:grid-cols-1 gap-6">
              {data.features?.map((f: Feature, index: number) => (
                <article key={f.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <span className="text-3xl mt-1" role="img" aria-label={f.title}>
                    {f.icon}
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">
                      {f.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {f.content}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 名人卡片 */}
          {data.celebrities && (
            <section className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">
                {type.toUpperCase()}型の有名人・著名人
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.celebrities.map((c: Celebrity) => (
                  <div key={c.name} className="p-4 border border-gray-200 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">{c.category}</div>
                    <div className="font-medium text-gray-900">{c.name}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 弱み・注意点 */}
          {data.points && (
            <section className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">
                {type.toUpperCase()}型の弱み・注意点
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                {data.points.map((point: string, idx: number) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
