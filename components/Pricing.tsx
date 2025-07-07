import React from "react";

export async function unlockPremium(sessionId: string) {
  // 动态请求后端 API 获取 Polar checkout link
  const res = await fetch('/api/create-polar-link', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  })
  const data = await res.json()
  if (data.url) {
    window.location.href = data.url
  } else {
    alert('获取支付链接失败')
  }
}

// 你可以根据需要扩展为完整组件或 hook 