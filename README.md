# Memoir Assistant Landing Page

专为65岁以上老年人设计的回忆录制作工具落地页。

## 🚀 快速开始

由于系统安全限制，请手动安装依赖：

### 1. 安装依赖

```bash
# 安装核心依赖
npm install react@^18.2.0 react-dom@^18.2.0 @supabase/supabase-js@^2.38.4 lucide-react@^0.294.0

# 安装开发依赖
npm install -D @types/react@^18.2.43 @types/react-dom@^18.2.17 @vitejs/plugin-react@^4.2.1 typescript@^5.2.2 vite@^5.0.8 tailwindcss@^3.3.6 postcss@^8.4.32 autoprefixer@^10.4.16
```

### 2. 配置 Supabase

1. 访问 [Supabase](https://supabase.com) 创建免费账户
2. 创建新项目，获取项目 URL 和 anon key
3. 在 SQL Editor 中执行：

```sql
CREATE TABLE subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL CHECK (length(name) >= 2 AND length(name) <= 10),
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

GRANT SELECT ON subscribers TO anon;
GRANT INSERT ON subscribers TO anon;

CREATE POLICY "Allow anonymous users to subscribe" ON subscribers
    FOR INSERT WITH CHECK (true);
```

### 3. 配置环境变量

创建 `.env` 文件：
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. 启动项目

```bash
npm run dev
```

访问 http://localhost:5173

## 🎯 功能特点

- **老年人友好设计**: 大字体(24px+)、高对比度、操作简单
- **邮件收集**: 实时验证，友好的错误提示
- **响应式布局**: 适配桌面端、平板、手机
- **无障碍支持**: 语义化HTML、键盘导航支持
- **一键部署**: 支持 Vercel、Netlify 等静态托管

## 📊 查看数据

在 Supabase Dashboard -> Table Editor 中查看 `subscribers` 表收集的邮件数据。

## 🚀 部署到 Vercel

1. Fork 这个仓库
2. 在 Vercel 导入仓库
3. 设置环境变量
4. 点击 Deploy

## 📞 联系方式

- 客服热线: 400-123-4567
- 工作时间: 周一至周五 9:00-18:00

## 📄 许可证

MIT License