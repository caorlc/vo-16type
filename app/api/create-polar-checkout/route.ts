import { NextRequest, NextResponse } from "next/server";
import { Polar } from "@polar-sh/sdk";
import { prisma } from "@/lib/prisma";

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN ?? "",
  server: "production", // 生产环境用 production
});

export async function POST(request: NextRequest) {
  try {
    const { productId, sessionId } = await request.json();

    // 创建 Polar checkout
    const checkout = await polar.checkouts.create({
      products: [productId],
      metadata: { sessionId }
    });

    // 返回 checkout 跳转链接
    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    console.error("创建 checkout 失败:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
} 