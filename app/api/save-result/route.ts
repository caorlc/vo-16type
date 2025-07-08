import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { ip, result, sessionId } = await request.json()
    await prisma.testResult.upsert({
      where: { sessionId },
      update: {
        ipAddress: ip,
        mbtiType: (result.type || '').trim().toUpperCase(),
      },
      create: {
        sessionId,
        ipAddress: ip,
        mbtiType: (result.type || '').trim().toUpperCase(),
      },
    })
    return NextResponse.json({ success: true, session_id: sessionId })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
