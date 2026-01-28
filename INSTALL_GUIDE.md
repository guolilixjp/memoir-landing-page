# 手动安装依赖说明

由于系统安全限制，无法直接运行npm命令。请手动安装以下依赖：

## 安装步骤

1. **安装核心依赖**（在终端中运行）：
```bash
npm install react@^18.2.0 react-dom@^18.2.0 @supabase/supabase-js@^2.38.4 lucide-react
```

2. **安装开发依赖**：
```bash
npm install -D @types/react@^18.2.43 @types/react-dom@^18.2.17 @vitejs/plugin-react@^4.2.1 typescript@^5.2.2 vite@^5.0.8 tailwindcss@^3.3.6 postcss@^8.4.32 autoprefixer@^10.4.16
```

## 环境配置

1. **创建.env文件**：
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. **Supabase数据库设置**：
在Supabase项目中执行以下SQL：
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

## 启动项目

```bash
npm run dev
```

项目将在 http://localhost:5173 启动