import { NextRequest, NextResponse } from "next/server"

const CREEM_API_KEY = process.env.CREEM_API_KEY
const CREEM_PRODUCT_ID = process.env.CREEM_PRODUCT_ID
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get("sessionId")
  if (!sessionId) {
    return NextResponse.json({ error: "缺少 sessionId" }, { status: 400 })
  }

  if (!CREEM_API_KEY || !CREEM_PRODUCT_ID || !BASE_URL) {
    return NextResponse.json({ error: "creem 配置缺失，请检查 .env" }, { status: 500 })
  }

  // creem 支付 return url，支付后跳回结果页
  const returnUrl = `${BASE_URL}/result/${sessionId}?pay=1`

  // 创建 creem 订单（伪代码，需根据 creem 官方 API 文档调整）
  try {
    const res = await fetch("https://api.creem.io/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CREEM_API_KEY}`,
      },
      body: JSON.stringify({
        product_id: CREEM_PRODUCT_ID,
        metadata: { sessionId },
        return_url: returnUrl,
        // 其他 creem 要求的参数
      }),
    })
    const data = await res.json()
    if (!res.ok || !data.payment_url) {
      return NextResponse.json({ error: data.error || "creem 下单失败" }, { status: 500 })
    }
    return NextResponse.json({ paymentUrl: data.payment_url })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
} 