import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

// 用户表
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique(),
  name: text('name'),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// 测试结果表
export const test_results = sqliteTable('test_results', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  session_id: text('session_id').unique().notNull(),
  user_id: integer('user_id').references(() => users.id),
  ip_address: text('ip_address').notNull(),
  user_agent: text('user_agent'),
  mbti_type: text('mbti_type').notNull(),
  dimension_scores: text('dimension_scores').notNull(), // JSON格式
  total_questions: integer('total_questions').default(70),
  completion_time: integer('completion_time'),
  is_premium_unlocked: integer('is_premium_unlocked', { mode: 'boolean' }).default(sql`0`),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  expires_at: text('expires_at'),
});

// 支付订单表
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  user_id: integer('user_id').references(() => users.id),
  session_id: text('session_id').notNull().references(() => test_results.session_id),
  order_id: text('order_id').unique().notNull(),
  amount: integer('amount').notNull(),
  currency: text('currency').default('JPY'),
  payment_method: text('payment_method'),
  status: text('status').notNull(), // 'pending', 'completed', 'failed', 'refunded'
  product_type: text('product_type').default('premium_report'),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// 测试完成统计表（简化版，直接关联test_results）
export const test_completions = sqliteTable('test_completions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  session_id: text('session_id').notNull().references(() => test_results.session_id),
  mbti_type: text('mbti_type').notNull(),
  completion_time: integer('completion_time'),
  question_count: integer('question_count').default(70),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// 关系定义
export const usersRelations = relations(users, ({ many }) => ({
  test_results: many(test_results),
  orders: many(orders),
}));

export const testResultsRelations = relations(test_results, ({ one, many }) => ({
  user: one(users, {
    fields: [test_results.user_id],
    references: [users.id],
  }),
  orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
  test_result: one(test_results, {
    fields: [orders.session_id],
    references: [test_results.session_id],
  }),
}));

export const testCompletionsRelations = relations(test_completions, ({ one }) => ({
  test_result: one(test_results, {
    fields: [test_completions.session_id],
    references: [test_results.session_id],
  }),
}));

// 类型定义
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type TestResult = typeof test_results.$inferSelect;
export type NewTestResult = typeof test_results.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type TestCompletion = typeof test_completions.$inferSelect;
export type NewTestCompletion = typeof test_completions.$inferInsert; 