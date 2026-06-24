# 光电效应可视化平台

基于 React + TypeScript + Vite 构建的光电效应交互式可视化平台，专注于光调制器的原理演示。

## ✨ 功能模块

- **🌊 光波干涉** — 双缝干涉动画，实时调节波长、振幅、相位差，观察干涉图样变化
- **🔬 MZ 调制器** — 马赫-曾德干涉仪结构可视化，演示电光调制原理
- **📊 IQ 调制器** — IQ 星座图与矢量分析，支持 QPSK / 16QAM / 64QAM 多种调制格式
- **🧭 XY 偏振复用** — 斯托克斯矢量与偏振态可视化，双通道独立调制演示

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|-----|------|------|
| React | 18.x | UI 框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 5.x | 构建工具 |
| Tailwind CSS | 3.x | 样式框架 |
| Zustand | 4.x | 状态管理 |
| React Router | 6.x | 页面路由 |
| Framer Motion | 11.x | 动画库 |
| Lucide React | 最新 | 图标库 |

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 📁 项目结构

```
src/
├── components/        # 可视化组件
│   ├── common/        # 通用组件
│   ├── interference/  # 光波干涉
│   ├── mz-modulator/  # MZ 调制器
│   ├── iq-modulator/  # IQ 调制器
│   └── polarization/  # 偏振复用
├── pages/             # 页面组件
├── stores/            # Zustand 状态管理
├── hooks/             # 自定义 Hooks
├── utils/             # 工具函数
└── App.tsx            # 应用入口
```

## 🌐 部署

项目配置了 GitHub Actions 自动部署，每次合并到 `main` 分支后会自动构建并发布到 GitHub Pages。

### 工作流程

1. Push 代码到 `main` 分支
2. GitHub Actions 自动执行构建
3. 构建产物部署到 GitHub Pages

访问地址：`https://<你的用户名>.github.io/<仓库名>/`

### 仓库配置

在 GitHub 仓库 **Settings → Pages** 中：

- **Source** 选择 **GitHub Actions**
- 无需手动配置分支和目录

### 手动触发

在仓库的 **Actions** 页面，选择 **Deploy to GitHub Pages** 工作流，点击 **Run workflow** 可手动触发部署。

## 📄 文档

- [产品需求文档](.trae/documents/spec.md)
- [技术架构文档](.trae/documents/plan.md)

## 📝 License

MIT
