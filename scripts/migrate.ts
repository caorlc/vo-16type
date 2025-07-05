#!/usr/bin/env node

import { migrate } from 'drizzle-orm/d1/migrator';
import { createDB } from '../lib/db/index';

// 迁移脚本
async function runMigrations() {
  try {
    console.log('开始数据库迁移...');
    
    // 这里需要传入 D1 实例
    // 在 Cloudflare Workers 环境中，D1 实例会通过环境变量注入
    const d1 = (globalThis as any).DB; // 假设 D1 实例名为 DB
    
    if (!d1) {
      throw new Error('D1 数据库实例未找到');
    }
    
    const db = createDB(d1);
    
    // 运行迁移
    await migrate(db, { migrationsFolder: './drizzle' });
    
    console.log('数据库迁移完成！');
  } catch (error) {
    console.error('迁移失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  runMigrations();
}

export { runMigrations }; 