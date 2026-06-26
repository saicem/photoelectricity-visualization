# 光电通讯实验室

一个基于 React 的交互式光通信学习与实验平台，通过精美的动画和实时参数控制，帮助理解光调制器件的工作原理。

分为 **Learn（学习）** 和 **Playground（实验）** 两大部分，从基础概念到高阶调制技术，循序渐进。

## 在线访问

**GitHub Pages**: https://saicem.github.io/photoelectricity-visualization/

## 功能模块

### 📚 Learn · 学习路径

共 10 个章节，按篇章分组，形成完整学习体系：

**Part 1 · 基础篇**
- 01 基础物理定义 — 光、场、功率、能量、电流、电压与电阻的基本公式
- 02 光波基础 — 光的本质、电磁波模型、波长与频率

**Part 2 · 光源篇**
- 03 激光器原理 — 受激辐射、粒子数反转、谐振腔原理

**Part 3 · 调制器篇**
- 04 干涉原理 — 双光束干涉、相干条件、MZI 结构
- 05 MZ 调制器 — 马赫-曾德电光调制器、三种调制模式
- 06 IQ 调制器 — 正交幅度调制、星座图、调制格式
- 07 偏振复用 — 斯托克斯矢量、庞加莱球、偏振态
- 08 高级调制 — Nyquist 整形、OFDM、概率星座整形

**Part 4 · 接收篇**
- 09 光接收器 — 相干接收、SNR、BER、EVM

**附录**
- 10 术语表 — 70+ 光通信常用术语查询

### 🧪 Playground · 交互实验

5 个可交互的仿真实验，支持实时参数调节：

| 实验 | 功能特点 |
|------|----------|
| 光波干涉 | 调节波长/振幅/相位差，观察干涉条纹变化 |
| MZ 调制器 | 电光调制原理演示，转移曲线实时绘制，单臂/双臂/推挽三种模式 |
| IQ 调制器 | QPSK/16QAM/64QAM 星座图，I/Q/P 全分量调节，发送/接收端对比分析 |
| 偏振复用 | 庞加莱球与偏振椭圆，斯托克斯参数实时计算 |
| 光接收器 | AWGN 信道、BER vs SNR 曲线、EVM 计算 |

### 📱 PWA 支持

支持安装到桌面，离线可用。使用 `vite-plugin-pwa` + Workbox 实现。

## 技术栈

- **前端框架**：React 19 + TypeScript
- **构建工具**：Vite 8
- **状态管理**：Zustand 5
- **样式方案**：Tailwind CSS v4
- **动画库**：Framer Motion 12
- **数学渲染**：KaTeX
- **路由管理**：React Router v7 (HashRouter)
- **可视化**：Canvas 2D + requestAnimationFrame
- **图标库**：Lucide React
- **PWA**：vite-plugin-pwa + Workbox

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 代码检查
pnpm lint

# 类型检查
pnpm check

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 部署

项目通过 GitHub Actions 自动部署到 GitHub Pages，详见 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)。
