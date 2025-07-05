import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

// D1数据库连接
export function createDB(d1: any) {
  return drizzle(d1, { schema });
}

// 导出schema供其他地方使用
export * from './schema'; 