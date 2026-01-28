# Supabase 配置指南

## 1. 创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com)
2. 注册/登录账号
3. 创建新项目
4. 复制项目 URL 和 anon key

## 2. 数据库设置

在 Supabase Dashboard -> SQL Editor 中执行：

```sql
-- 创建订阅者表
CREATE TABLE subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL CHECK (length(name) >= 2 AND length(name) <= 10),
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_created_at ON subscribers(created_at DESC);

-- 授权匿名用户
GRANT SELECT ON subscribers TO anon;
GRANT INSERT ON subscribers TO anon;

-- 创建 RLS 策略
CREATE POLICY "Allow anonymous users to subscribe" ON subscribers
    FOR INSERT WITH CHECK (true);
```

## 3. 环境变量配置

在项目根目录创建 `.env` 文件：

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 4. 验证连接

启动项目后，表单提交应该能够正常工作。

## 5. 查看数据

在 Supabase Dashboard -> Table Editor 中可以查看收集到的订阅者数据。