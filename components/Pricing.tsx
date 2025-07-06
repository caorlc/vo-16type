import React from "react";

export async function unlockPremium(sessionId: string) {
  try {
    const res = await fetch(`/api/create-creem-order?sessionId=${sessionId}`);
    const data = await res.json();
    if (data && data.paymentUrl) {
      window.location.href = data.paymentUrl;
    } else {
      alert('支払いリンクの取得に失敗しました');
    }
  } catch (e) {
    alert('支払いの処理中にエラーが発生しました');
  }
}

// 你可以根据需要扩展为完整组件或 hook 