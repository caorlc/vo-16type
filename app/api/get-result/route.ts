import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("sessionId")
    const ip = searchParams.get("ip")

    if (!sessionId && !ip) {
      return NextResponse.json({ error: "sessionId或IP为空" }, { status: 400 })
    }

    let result = null
    if (sessionId) {
      result = await prisma.testResult.findFirst({
        where: {
          sessionId
        }
      })
    } else if (ip) {
      result = await prisma.testResult.findFirst({
        where: {
          ipAddress: ip
        },
        orderBy: { createdAt: "desc" }
      })
    }

    if (!result) {
      return NextResponse.json({ result: null })
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error("获取结果失败:", error)
    return NextResponse.json({ error: String(error), result: null }, { status: 500 })
  }
}
