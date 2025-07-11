"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">エラーが発生しました</h2>
      <p className="mb-4">{error?.message || "不明なエラー"}</p>
      <button onClick={reset} className="px-4 py-2 bg-orange-500 text-white rounded">リトライ</button>
    </div>
  );
} 