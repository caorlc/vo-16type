import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  console.log("=== Polar Webhook 处理开始 ===");

  try {
    const body = await request.text();
    console.log("Webhook payload:", body);
    const headers = Object.fromEntries(request.headers.entries());
    const signature = headers["polar-signature"];

    // 签名校验
    if (process.env.POLAR_WEBHOOK_SECRET && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", process.env.POLAR_WEBHOOK_SECRET)
        .update(body)
        .digest("hex");

      if (signature !== expectedSignature) {
        console.error("签名验证失败");
        return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
      }
    }

    // 解析事件
    const event = JSON.parse(body);
    const eventType = event.type;
    const eventData = event.data;
    console.log("eventType:", eventType);

    switch (eventType) {
      case "order.paid": {
        const sessionId = eventData?.metadata?.sessionId;
        const orderId = eventData?.id;
        const amount = eventData?.total_amount;
        const currency = eventData?.currency || "USD";
        const status = eventData?.status || "paid";
        console.log("order.paid sessionId:", sessionId, "orderId:", orderId);
      
        if (sessionId && orderId) {
          // 解锁 premium
          await prisma.testResult.updateMany({
            where: { sessionId },
            data: { isPremiumUnlocked: true },
          });
      
          // 写入订单
          await prisma.order.create({
            data: {
              sessionId,
              orderId,
              amount,
              currency,
              status,
            }
          });
      
          console.log(`Premium unlocked and order saved for sessionId: ${sessionId}, orderId: ${orderId}`);
        } else if (sessionId) {
          // 只解锁 premium
          await prisma.testResult.updateMany({
            where: { sessionId },
            data: { isPremiumUnlocked: true },
          });
          console.log(`Premium unlocked for sessionId: ${sessionId}, but no orderId found.`);
        } else {
          console.log("No sessionId found in payload.");
        }
        break;
      }
      // 可扩展其他事件类型
      default:
        console.log("未处理的事件类型:", eventType);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook 处理错误:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}