import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // creem 通知内容结构需根据官方文档调整
    const eventType = body.event || body.type
    const order = body.data || body.order || {}
    // 你需要根据 creem 的 webhook payload 结构调整解析方式
    const sessionId = order.metadata?.sessionId || order.sessionId
    const status = order.status || body.status

    if (!sessionId) {
      return NextResponse.json({ error: "缺少 sessionId" }, { status: 400 })
    }

    // 只处理支付成功的事件
    if (status === "paid" || status === "succeeded" || eventType === "order.paid") {
      await prisma.testResult.updateMany({
        where: { sessionId },
        data: { isPremiumUnlocked: true },
      })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ ignored: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
} 