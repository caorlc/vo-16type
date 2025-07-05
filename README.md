# 16タイプ性格诊断

## 项目简介

一个面向日本用户的16型人格（MBTI）测试网站，支持个性化结果、付费解锁深度报告、数据统计与分析。

## 技术栈
- Next.js 作为前端框架
- Cloudflare D1 作为数据库（Serverless SQLite）
- Drizzle ORM 简化数据库操作
- Vercel 或 Cloudflare Pages 部署
- Stripe 支付集成
- Google Analytics 数据统计
- 域名已接入 Cloudflare

## 快速开始

1. 克隆本仓库
2. 安装依赖：`pnpm install`
3. 配置环境变量（见 `.env.example`）
4. 本地开发：`pnpm dev`
5. 部署到 Vercel 或 Cloudflare Pages
6. 配置 D1 数据库（Cloudflare 后台一键创建）

## 数据库表结构（建议）

- users（可选，后续登录/支付用）
  - id, email, created_at
- test_results（必需）
  - id, user_id, ip, type, detail, created_at
- orders（支付/订阅）
  - id, user_id, amount, status, created_at

## 主要功能
- 70题MBTI测试，自动计算16型人格
- 结果页展示类型、分数、详细解读
- 付费解锁深度报告（Stripe）
- 16型百科、对比、名人案例
- 数据统计与GA集成

## 未来规划
- 用户系统/登录
- 社交分享、成长打卡
- 更多数据分析与可视化

---
如有问题欢迎提issue或联系作者。