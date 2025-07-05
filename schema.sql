-- Cloudflare D1 数据库 Schema
-- 16タイプ性格診断项目数据库结构

-- 用户表（可选，为未来登录/支付功能预留）
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 测试结果表（核心表）
CREATE TABLE IF NOT EXISTS test_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT UNIQUE NOT NULL, -- 会话ID，用于结果页面访问
  user_id INTEGER, -- 可选，关联用户
  ip_address TEXT NOT NULL, -- IP地址
  user_agent TEXT, -- 用户代理
  mbti_type TEXT NOT NULL, -- MBTI类型 (如: INFP, ENFJ等)
  
  -- 维度分数详情 (JSON格式存储)
  dimension_scores TEXT NOT NULL, -- {"EI":{"a":1,"b":9},"SN":{"a":10,"b":10},"TF":{"a":9,"b":11},"JP":{"a":9,"b":11}}
  
  -- 测试详情
  total_questions INTEGER DEFAULT 70, -- 总题目数
  completion_time INTEGER, -- 完成时间（秒）
  
  -- 结果状态
  is_premium_unlocked BOOLEAN DEFAULT FALSE, -- 是否解锁付费内容
  
  -- 时间戳
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME, -- 结果过期时间（24小时后）
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 支付订单表
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  session_id TEXT NOT NULL, -- 关联测试结果
  order_id TEXT UNIQUE NOT NULL, -- 外部订单ID (Stripe)
  
  -- 支付信息
  amount INTEGER NOT NULL, -- 金额（分）
  currency TEXT DEFAULT 'JPY',
  payment_method TEXT, -- 支付方式
  
  -- 订单状态
  status TEXT NOT NULL, -- 'pending', 'completed', 'failed', 'refunded'
  
  -- 产品信息
  product_type TEXT DEFAULT 'premium_report', -- 产品类型
  
  -- 时间戳
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (session_id) REFERENCES test_results(session_id)
);

-- 测试完成统计表（简化版，直接关联test_results）
CREATE TABLE IF NOT EXISTS test_completions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  mbti_type TEXT NOT NULL,
  
  -- 完成信息
  completion_time INTEGER, -- 完成时间（秒）
  question_count INTEGER DEFAULT 70,
  
  -- 时间戳
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (session_id) REFERENCES test_results(session_id)
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_test_results_session_id ON test_results(session_id);
CREATE INDEX IF NOT EXISTS idx_test_results_ip ON test_results(ip_address);
CREATE INDEX IF NOT EXISTS idx_test_results_created_at ON test_results(created_at);
CREATE INDEX IF NOT EXISTS idx_test_results_mbti_type ON test_results(mbti_type);

CREATE INDEX IF NOT EXISTS idx_orders_session_id ON orders(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

CREATE INDEX IF NOT EXISTS idx_test_completions_mbti_type ON test_completions(mbti_type);
CREATE INDEX IF NOT EXISTS idx_test_completions_created_at ON test_completions(created_at); 