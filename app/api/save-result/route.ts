export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server'
import { createDB } from '@/lib/db'
import { TestResultService, TestCompletionService } from '@/lib/db/queries'

// 生成唯一session ID
function generateSessionId(): string {
  return Math.random().toString(36).substr(2, 16)
}

export async function POST(request: NextRequest) {
  try {
    const { ip, result, sessionId } = await request.json()
    
    // 获取D1数据库实例
    const d1 = (process.env as any).DB
    
    if (!d1) {
      return NextResponse.json({ 
        error: 'D1 数据库未配置',
        message: '请在 Cloudflare Pages 中绑定 D1 数据库'
      }, { status: 500 })
    }

    const db = createDB(d1)
    const testResultService = new TestResultService(db)
    const testCompletionService = new TestCompletionService(db)
    
    // 使用传入的sessionId，如果没有则生成新的
    const finalSessionId = sessionId || generateSessionId()
    
    // 保存测试结果到D1数据库
    await testResultService.saveResult({
      session_id: sessionId,
      ip_address: ip,
      user_agent: request.headers.get('user-agent') || undefined,
      mbti_type: result.type,
      dimension_scores: JSON.stringify(result.detail),
      completion_time: result.completion_time
    })
    
    // 记录测试完成统计
    await testCompletionService.recordTestCompletion({
      session_id: sessionId,
      mbti_type: result.type,
      completion_time: result.completion_time,
      question_count: 70
    })
    
    return NextResponse.json({ 
      success: true, 
      session_id: sessionId 
    })
  } catch (error) {
    console.error('保存失败:', error)
    return NextResponse.json({ error: '保存失败' }, { status: 500 })
  }
} 