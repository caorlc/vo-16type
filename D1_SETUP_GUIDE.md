# Cloudflare D1 数据库创建和配置指南

## 第一步：创建D1数据库

### 1. 登录Cloudflare Dashboard
1. 访问 [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. 登录你的Cloudflare账户

### 2. 创建D1数据库
1. 在左侧菜单找到 **"Workers & Pages"**
2. 点击 **"D1"** 标签
3. 点击 **"Create database"** 按钮
4. 填写数据库信息：
   - **Database name**: `mbti-test-db` (或你喜欢的名称)
   - **Region**: 选择离用户最近的区域（建议选择 `Asia Pacific` 或 `Japan`）
5. 点击 **"Create"** 创建数据库

### 3. 记录数据库信息
创建完成后，你会看到：
- **Database ID**: 类似 `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Database name**: `mbti-test-db`

## 第二步：绑定数据库到项目

### 1. 进入Pages项目设置
1. 在Cloudflare Dashboard中，进入 **"Workers & Pages"**
2. 找到你的项目（如果没有，需要先部署项目）
3. 点击项目名称进入项目详情

### 2. 配置环境变量
1. 点击 **"Settings"** 标签
2. 在左侧菜单找到 **"Environment variables"**
3. 点击 **"Add variable"**
4. 配置环境变量：
   - **Variable name**: `DB`
   - **Value**: 选择刚创建的D1数据库
   - **Environment**: 勾选 `Production`, `Preview`, `Development`
5. 点击 **"Save and deploy"**

## 第三步：本地开发配置

### 1. 安装Wrangler CLI
```bash
npm install -g wrangler
# 或者
pnpm add -g wrangler
```

### 2. 登录Wrangler
```bash
wrangler login
```

### 3. 创建wrangler.toml配置文件
在项目根目录创建 `wrangler.toml`：

```toml
name = "mbti-test"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "mbti-test-db"
database_id = "你的数据库ID"
```

### 4. 配置本地环境变量
创建 `.env.local` 文件：
```env
# 复制 env.example 内容
DB_NAME=mbti-test-db
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="16タイプ性格診断"
```

## 第四步：运行数据库迁移

### 1. 生成迁移文件
```bash
pnpm db:generate
```

### 2. 推送到D1数据库
```bash
pnpm db:push
```

### 3. 验证数据库结构
```bash
# 查看数据库表
wrangler d1 execute mbti-test-db --command "SELECT name FROM sqlite_master WHERE type='table';"
```

## 第五步：测试数据库连接

### 1. 启动开发服务器
```bash
pnpm dev
```

### 2. 测试API
访问 `http://localhost:3000/api/test-db` 测试数据库连接

### 3. 检查响应
应该看到类似这样的响应：
```json
{
  "success": true,
  "message": "数据库连接测试成功",
  "data": {
    "saved_result": {...},
    "retrieved_result": {...},
    "mbti_distribution": [...]
  }
}
```

## 第六步：更新现有API

### 1. 更新save-result API
将现有的JSON文件存储改为D1数据库存储

### 2. 更新get-result API
从D1数据库查询结果而不是JSON文件

### 3. 测试完整流程
1. 完成MBTI测试
2. 保存结果到D1
3. 查看结果页面
4. 验证数据持久化

## 常见问题解决

### 问题1：数据库连接失败
**解决方案**：
- 检查环境变量配置
- 确认数据库绑定正确
- 验证wrangler.toml配置

### 问题2：迁移失败
**解决方案**：
- 检查schema语法
- 确认数据库权限
- 查看错误日志

### 问题3：本地开发无法连接
**解决方案**：
- 确保wrangler已登录
- 检查wrangler.toml配置
- 重启开发服务器

## 下一步

数据库配置完成后，你需要：
1. 更新现有的API路由使用D1数据库
2. 迁移现有的JSON数据到D1
3. 测试完整的用户流程
4. 部署到生产环境

需要我帮你更新具体的API路由吗？ 