import { Webhooks } from "@polar-sh/nextjs";
import { prisma } from "@/lib/prisma";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (event) => {
    try {
      const eventType = event.type;
      const eventData = event.data;
      console.log("eventType:", eventType);
      console.log("eventData:", JSON.stringify(eventData));

      switch (eventType) {
        case "order.paid": {
          const sessionId = eventData?.metadata?.sessionId;
          const orderId = eventData?.id;
          const amount = eventData?.total_amount ?? eventData?.amount ?? 0;
          const currency = eventData?.currency || "USD";
          const status = eventData?.status || "paid";
          console.log("order.paid sessionId:", sessionId, "orderId:", orderId, "amount:", amount);

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
    } catch (error) {
      console.error("Webhook 处理错误:", error);
      // Webhooks 封装会自动返回 200/500，无需手动返回
    }
  },
}); 