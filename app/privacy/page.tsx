import React from "react";

const PrivacyPage = () => (
  <main className="max-w-2xl mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold mb-6">プライバシーポリシー</h1>
    <section className="space-y-4 text-base leading-7">
      <p>
        16Type（以下「当社」といいます）は、お客様のプライバシーを尊重し、個人情報の保護に最大限努めています。本プライバシーポリシーは、当社がどのようにお客様の情報を収集、利用、保存、共有、保護するか、またお客様の権利について説明します。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. 収集する情報</h2>
      <ul className="list-disc ml-6">
        <li>氏名、メールアドレス、年齢、性別などの連絡先・プロフィール情報</li>
        <li>性格診断テストの回答・結果、アンケート回答、フィードバック等のユーザー提供情報</li>
        <li>IPアドレス、ブラウザ情報、端末情報、OS、リファラー、アクセス日時等の技術情報</li>
        <li>クッキー、ウェブビーコン、ローカルストレージ等を通じた利用状況・行動履歴</li>
        <li>第三者サービス（例：Google、Facebook等）を利用した場合の認証情報や公開プロフィール</li>
        <li>有料サービス利用時の決済情報（クレジットカード情報は決済代行会社経由で管理）</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. 情報の利用目的</h2>
      <ul className="list-disc ml-6">
        <li>サービスの提供、運営、改善、新機能開発</li>
        <li>ユーザー認証、本人確認、アカウント管理</li>
        <li>お問い合わせ・サポート対応</li>
        <li>統計・分析によるサービス品質向上</li>
        <li>マーケティング、広告配信、パーソナライズ</li>
        <li>法令遵守、利用規約違反の防止・対応</li>
        <li>ユーザーへの重要なお知らせ・変更通知</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. クッキー等の利用</h2>
      <p>
        当社は、ウェブサイトの利便性向上、利用状況分析、広告配信、セキュリティ強化のためにクッキーや類似技術を使用します。クッキーの利用はブラウザ設定で制限・拒否できますが、一部機能が利用できなくなる場合があります。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. 第三者への情報提供</h2>
      <p>
        当社は、以下の場合を除き、個人情報を第三者に開示・提供しません：
      </p>
      <ul className="list-disc ml-6">
        <li>法令に基づく場合</li>
        <li>サービス提供のために業務委託先（クラウドサービス、決済代行、分析ツール等）に必要な範囲で提供する場合</li>
        <li>ユーザーの同意がある場合</li>
        <li>統計的に処理され、個人を特定できない形式での開示</li>
        <li>合併・事業譲渡等に伴う事業承継の場合</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. 国際的なデータ移転</h2>
      <p>
        当社は、サービス運営上、国外のサーバーや第三者サービスを利用する場合があります。その際は、適用法令に従い、個人情報の適切な保護措置を講じます。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. 情報の保存期間</h2>
      <p>
        当社は、利用目的に必要な期間、または法令で定められた期間、個人情報を保存します。保存期間終了後は、速やかに安全な方法で削除・消去します。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. 情報の保護対策</h2>
      <p>
        当社は、個人情報の漏洩、滅失、毀損、不正アクセス等を防止するため、物理的・技術的・組織的な安全管理措置を講じます。従業員・委託先にも適切な監督を行います。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. ユーザーの権利</h2>
      <ul className="list-disc ml-6">
        <li>ご自身の個人情報の開示、訂正、削除、利用停止等を求める権利</li>
        <li>ダイレクトマーケティングやプロファイリングへの異議申立て権</li>
        <li>同意の撤回権（撤回前の処理の適法性には影響しません）</li>
      </ul>
      <p>
        これらの権利行使をご希望の場合は、下記お問い合わせ先までご連絡ください。ご本人確認の上、法令に従い速やかに対応します。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. 未成年者のプライバシー</h2>
      <p>
        16歳未満の方は、保護者の同意を得た上でご利用ください。当社は、故意に16歳未満の個人情報を収集しません。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. プライバシーポリシーの変更</h2>
      <p>
        本ポリシーは、法令改正やサービス内容の変更等に応じて改定されることがあります。重要な変更がある場合は、ウェブサイト上でお知らせします。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">11. お問い合わせ</h2>
      <p>
        プライバシーに関するご質問、ご要望、苦情、権利行使のご依頼は、info@16type.com までご連絡ください。
      </p>
    </section>
  </main>
);

export default PrivacyPage; 