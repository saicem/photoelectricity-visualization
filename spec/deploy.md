# 部署方案

## GitHub Pages 自动部署

使用 GitHub Actions 实现推送 `main` 分支后自动构建并部署到 GitHub Pages。

### 工作流配置

- **配置文件**: `.github/workflows/deploy.yml`
- **触发条件**: push 到 `main` 分支，或手动触发 (`workflow_dispatch`)
- **构建环境**: Ubuntu latest + Node.js 24 + pnpm 11

### 部署流程

```
Push to main → Checkout → Install pnpm → Install deps → Build → Upload artifact → Deploy to Pages
```

### Vite 配置

- 构建时通过环境变量设置 base 路径
- 使用 `HashRouter` 适配 GitHub Pages

### 仓库设置

GitHub 仓库 Settings → Pages → Source 选择 **GitHub Actions**。
