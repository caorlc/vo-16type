import { Webhooks } from "@polar-sh/nextjs";
import { prisma } from "@/lib/prisma";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onOrderPaid: async (payload) => {
    const sessionId = payload.order?.metadata?.sessionId;
    if (sessionId) {
      await prisma.testResult.updateMany({
        where: { sessionId },
        data: { isPremiumUnlocked: true },
      });
      // 你也可以记录订单到Order表
    }
  },
}); 