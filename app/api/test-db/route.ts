import { NextRequest, NextResponse } from 'next/server';
import { createDB } from '@/lib/db';
import { TestResultService, TestCompletionService, AnalyticsService } from '@/lib/db/queries';
import { sql } from 'drizzle-orm';

// 测试数据库连接的API
export async function GET(request: NextRequest) {
  try {
    // 注意：在 Cloudflare Pages 中，D1 实例通过环境变量注入
    // 这里需要根据实际部署环境调整
    const d1 = (process.env as any).DB;
    
    if (!d1) {
      return NextResponse.json({ 
        error: 'D1 数据库未配置',
        message: '请在 Cloudflare Pages 中绑定 D1 数据库'
      }, { status: 500 });
    }

    const db = createDB(d1);
    
    // 测试各个服务
    const testResultService = new TestResultService(db);
    const testCompletionService = new TestCompletionService(db);
    const analyticsService = new AnalyticsService(db);

    // 测试查询
    const testData = {
      session_id: 'test-session-' + Date.now(),
      ip_address: '127.0.0.1',
      mbti_type: 'INFP',
      dimension_scores: JSON.stringify({
        EI: { a: 1, b: 9 },
        SN: { a: 10, b: 10 },
        TF: { a: 9, b: 11 },
        JP: { a: 9, b: 11 }
      })
    };

    // 保存测试数据
    await testResultService.saveResult(testData);

    // 查询测试数据
    const result = await testResultService.getResultBySessionId(testData.session_id);

    // 获取统计信息
    const distribution = await analyticsService.getMBTIDistribution();

    return NextResponse.json({
      success: true,
      message: '数据库连接测试成功',
      data: {
        saved_result: testData,
        retrieved_result: result,
        mbti_distribution: distribution
      }
    });

  } catch (error) {
    console.error('数据库测试失败:', error);
    return NextResponse.json({ 
      error: '数据库测试失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
}

// 清理测试数据的API
export async function DELETE(request: NextRequest) {
  try {
    const d1 = (process.env as any).DB;
    
    if (!d1) {
      return NextResponse.json({ error: 'D1 数据库未配置' }, { status: 500 });
    }

    const db = createDB(d1);
    
    // 清理测试数据（删除包含 'test-session' 的记录）
    await db.run(sql`
      DELETE FROM test_results 
      WHERE session_id LIKE '%test-session%'
    `);

    return NextResponse.json({
      success: true,
      message: '测试数据清理完成'
    });

  } catch (error) {
    console.error('清理测试数据失败:', error);
    return NextResponse.json({ 
      error: '清理失败',
      details: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
} 