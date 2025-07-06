export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "16タイプ性格診断",
    "description": "世界で最も信頼されている16タイプ性格診断で、あなたの隠れた才能と可能性を発見。科学的根拠に基づいたMBTI診断で、16の性格タイプからあなたにぴったりのタイプを特定します。",
    "url": "https://your-domain.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://your-domain.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://twitter.com/your-handle",
      "https://facebook.com/your-page"
    ]
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "16タイプ性格診断（MBTとは何ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "16タイプ性格診断（MBTI：Myers-Briggs Type Indicator）は、心理学者カール・ユングの心理学的類型論を基に開発された性格診断ツールです。16の性格タイプに分類し、あなたの思考パターン、価値観、行動傾向を明らかにします。世界中で最も信頼され、多くの企業や教育機関で活用されている16タイプ性格診断です。"
        }
      },
      {
        "@type": "Question",
        "name": "16タイプ性格診断は何問ありますか？時間はどのくらいかかりますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "当サイトの16タイプ性格診断は70問の質問で構成されており、通常10分程度で完了します。各質問は簡単で分かりやすく設計されているため、気軽にお答えいただけます。"
        }
      },
      {
        "@type": "Question",
        "name": "16タイプにはどのような種類がありますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "16タイプ性格診断では16の性格タイプがあります：INTJ（建築家）、INTP（論理学者）、ENTJ（指揮官）、ENTP（討論者）、INFJ（提唱者）、INFP（仲介者）、ENFJ（主人公）、ENFP（運動家）、ISTJ（管理者）、ISFJ（擁護者）、ESTJ（幹部）、ESFJ（領事）、ISTP（巨匠）、ISFP（冒険家）、ESTP（起業家）、ESFP（エンターテイナー）です。"
        }
      },
      {
        "@type": "Question",
        "name": "16タイプ性格診断の結果は変わることがありますか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "はい、ライフステージや経験、環境の変化によって16タイプ性格診断の結果が変わることがあります。これは正常なことで、人は成長し続けるものです。半年から1年に一度の16タイプ性格診断をおすすめします。"
        }
      },
      {
        "@type": "Question",
        "name": "16タイプ性格診断の個人情報の取り扱いは安全ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "お客様のプライバシーを最優先に考え、16タイプ性格診断の結果や個人データは厳重に管理しています。診断結果や個人データは暗号化され、第三者に提供されることはありません。"
        }
      }
    ]
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "16タイプ性格診断",
    "url": "https://your-domain.com",
    "logo": "https://your-domain.com/logo.png",
    "description": "日本人のための16タイプ性格診断サービス",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "Japanese"
    }
  };

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "16タイプ性格診断",
    "description": "世界で最も信頼されている16タイプ性格診断で、あなたの隠れた才能と可能性を発見。科学的根拠に基づいたMBTI診断で、16の性格タイプからあなたにぴったりのタイプを特定します。",
    "provider": {
      "@type": "Organization",
      "name": "16タイプ性格診断"
    },
    "serviceType": "性格診断",
    "areaServed": {
      "@type": "Country",
      "name": "日本"
    },
    "availableLanguage": "ja",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY",
      "description": "無料で16タイプ性格診断を受けることができます"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />
    </>
  );
} 