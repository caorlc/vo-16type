import { eq, and, desc, sql } from 'drizzle-orm';
import { createDB } from './index';
import { test_results, test_completions, orders } from './schema';

// 测试结果相关操作
export class TestResultService {
  constructor(private db: ReturnType<typeof createDB>) {}

  // 保存测试结果
  async saveResult(data: {
    session_id: string;
    ip_address: string;
    user_agent?: string;
    mbti_type: string;
    dimension_scores: string;
    completion_time?: number;
  }) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24小时后过期
    
    return await this.db.insert(test_results).values({
      ...data,
      expires_at: expiresAt.toISOString(),
    });
  }

  // 根据session_id获取结果
  async getResultBySessionId(session_id: string) {
    const results = await this.db
      .select()
      .from(test_results)
      .where(
        and(
          eq(test_results.session_id, session_id),
          sql`${test_results.expires_at} > datetime('now')`
        )
      )
      .limit(1);
    
    return results[0] || null;
  }

  // 根据IP获取最新结果
  async getResultByIP(ip_address: string) {
    const results = await this.db
      .select()
      .from(test_results)
      .where(
        and(
          eq(test_results.ip_address, ip_address),
          sql`${test_results.expires_at} > datetime('now')`
        )
      )
      .orderBy(desc(test_results.created_at))
      .limit(1);
    
    return results[0] || null;
  }

  // 解锁付费内容
  async unlockPremium(session_id: string) {
    return await this.db
      .update(test_results)
      .set({ is_premium_unlocked: sql`1` })
      .where(eq(test_results.session_id, session_id));
  }
}

// 测试完成相关操作
export class TestCompletionService {
  constructor(private db: ReturnType<typeof createDB>) {}

  // 记录测试完成
  async recordTestCompletion(data: {
    session_id: string;
    mbti_type: string;
    completion_time?: number;
    question_count?: number;
  }) {
    return await this.db.insert(test_completions).values(data);
  }
}

// 订单相关操作
export class OrderService {
  constructor(private db: ReturnType<typeof createDB>) {}

  // 创建订单
  async createOrder(data: {
    session_id: string;
    order_id: string;
    amount: number;
    currency?: string;
    payment_method?: string;
    product_type?: string;
  }) {
    return await this.db.insert(orders).values({
      ...data,
      status: 'pending',
    });
  }

  // 更新订单状态
  async updateOrderStatus(order_id: string, status: string) {
    return await this.db
      .update(orders)
      .set({ 
        status,
        updated_at: new Date().toISOString()
      })
      .where(eq(orders.order_id, order_id));
  }

  // 根据session_id获取订单
  async getOrderBySessionId(session_id: string) {
    const results = await this.db
      .select()
      .from(orders)
      .where(eq(orders.session_id, session_id))
      .orderBy(desc(orders.created_at))
      .limit(1);
    
    return results[0] || null;
  }
}

// 统计相关操作
export class AnalyticsService {
  constructor(private db: ReturnType<typeof createDB>) {}

  // 获取MBTI类型分布统计
  async getMBTIDistribution() {
    const results = await this.db
      .select({
        mbti_type: test_completions.mbti_type,
        count: sql<number>`count(*)`,
      })
      .from(test_completions)
      .groupBy(test_completions.mbti_type)
      .orderBy(desc(sql`count(*)`));
    
    return results;
  }

  // 获取每日测试完成数
  async getDailyCompletions(days: number = 7) {
    const results = await this.db
      .select({
        date: sql<string>`date(${test_completions.created_at})`,
        count: sql<number>`count(*)`,
      })
      .from(test_completions)
      .where(sql`${test_completions.created_at} >= datetime('now', '-${days} days')`)
      .groupBy(sql`date(${test_completions.created_at})`)
      .orderBy(sql`date(${test_completions.created_at})`);
    
    return results;
  }

  // 获取测试完成统计（简化版，移除页面访问统计）
  async getTestCompletions(days: number = 7) {
    const results = await this.db
      .select({
        date: sql<string>`date(${test_completions.created_at})`,
        count: sql<number>`count(*)`,
      })
      .from(test_completions)
      .where(sql`${test_completions.created_at} >= datetime('now', '-${days} days')`)
      .groupBy(sql`date(${test_completions.created_at})`)
      .orderBy(sql`date(${test_completions.created_at})`);
    
    return results;
  }
} 