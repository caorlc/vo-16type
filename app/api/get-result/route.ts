import { NextRequest, NextResponse } from 'next/server'
export const runtime = 'edge';

import { createDB } from '@/lib/db'
import { TestResultService } from '@/lib/db/queries'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ip = searchParams.get('ip')
    if (!ip) {
      return NextResponse.json({ error: 'IP参数缺失' }, { status: 400 })
    }

    const d1 = (process.env as any).DB
    if (!d1) {
      return NextResponse.json({ error: 'D1 数据库未配置' }, { status: 500 })
    }
    const db = createDB(d1)
    const testResultService = new TestResultService(db)

    // 用 D1 查询结果
    const result = await testResultService.getResultByIp(ip)
    return NextResponse.json({ result: result || null })
  } catch (error) {
    return NextResponse.json({ result: null })
  }
} 