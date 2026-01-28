# Memoir Assistant Coming Soon Landing Page

## 🚀 一键部署到 Vercel

点击下方按钮即可部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/memoir-landing)

## 📋 部署前准备

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并创建免费账户
2. 创建新项目，记录项目 URL 和 anon key
3. 在 SQL Editor 中执行数据库初始化脚本（见下方）

### 2. 数据库初始化

在 Supabase 控制台中执行：

```sql
-- 创建订阅者表
CREATE TABLE subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL CHECK (length(name) >= 2 AND length(name) <= 10),
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 授权匿名用户访问
GRANT SELECT ON subscribers TO anon;
GRANT INSERT ON subscribers TO anon;

-- 创建 RLS 策略
CREATE POLICY "Allow anonymous users to subscribe" ON subscribers
    FOR INSERT WITH CHECK (true);
```

### 3. 环境变量配置

在 Vercel 部署时设置环境变量：

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎯 功能特点

- ✅ 老年人友好设计（大字体、高对比度）
- ✅ 响应式布局
- ✅ 表单验证和错误处理
- ✅ 成功提示动画
- ✅ 无障碍支持
- ✅ 邮件收集和存储

## 📊 查看收集的数据

部署后，在 Supabase Dashboard -> Table Editor 中查看 `subscribers` 表即可看到所有收集的邮件地址。

## 🔧 自定义

- 修改 `src/App.tsx` 来自定义页面内容
- 调整 `tailwind.config.js` 来自定义样式
- 更新 `src/hooks/useSubscribe.ts` 来自定义提交逻辑

## 📞 支持

如有问题，请通过以下方式联系：
- 邮箱：support@memoir-assistant.com
- 电话：400-123-4567