import React from "react";

export async function unlockPremium(sessionId: string) {
  // 直接跳转到Polar的checkout link，带上sessionId
  window.location.href = `https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_wtm1MOtOoSnHCj1UUospQhXgCVD9VSpsb0AGf3MQ4WP/redirect?metadata[sessionId]=${sessionId}`;
}

// 你可以根据需要扩展为完整组件或 hook 