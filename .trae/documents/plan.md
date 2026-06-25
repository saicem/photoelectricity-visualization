# 光电效应可视化平台 - 技术架构文档

## 1. 架构设计

```mermaid
graph TB
    subgraph 前端层
        A[React Router<br/>页面路由] --> B[Zustand<br/>状态管理]
        B --> C[可视化组件层]
        C --> D[Canvas 2D<br/>渲染引擎]
        C --> E[动画控制器]
    end
    
    subgraph 样式层
        F[Tailwind CSS<br/>工具类样式] --> C
        G[CSS 动画<br/>过渡效果] --> C
    end
    
    subgraph 工具层
        H[Lucide React<br/>图标库]
        I[clsx<br/>类名工具]
        J[KaTeX<br/>数学公式渲染]
    end
```

## 2. 技术选型

| 技术 | 版本 | 用途 |
|-----|------|------|
| React | 18.x | UI框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 5.x | 构建工具 |
| Tailwind CSS | 3.x | 样式框架 |
| Zustand | 4.x | 状态管理 |
| React Router | 6.x | 页面路由 |
| Lucide React | 最新 | 图标库 |
| Framer Motion | 11.x | 动画库 |
| KaTeX | 最新 | 数学公式渲染 |

## 3. 路由定义

| 路由 | 页面 | 描述 |
|-----|------|------|
| `/` | HomePage | 首页，模块入口 |
| `/learn/light-basics` | LearnLightBasics | 光波基础学习 |
| `/learn/laser` | LearnLaser | 激光器学习 |
| `/learn/interference` | LearnInterference | 干涉原理学习 |
| `/learn/mz-modulator` | LearnMZModulator | MZ调制器学习 |
| `/learn/iq-modulator` | LearnIQModulator | IQ调制器学习 |
| `/learn/polarization` | LearnPolarization | 偏振复用学习 |
| `/learn/dual-polarization` | LearnDualPolarization | 双偏振IQ学习 |
| `/learn/receiver` | LearnReceiver | 光接收器学习 |
| `/learn/glossary` | LearnGlossary | 术语表 |
| `/playground/interference` | InterferencePage | 光波干涉实验 |
| `/playground/mz-modulator` | MZModulatorPage | MZ调制器实验 |
| `/playground/iq-modulator` | IQModulatorPage | IQ调制器实验 |
| `/playground/polarization` | PolarizationPage | 偏振复用实验 |
| `/playground/receiver` | ReceiverPage | 光接收器实验 |

## 4. 组件结构

```
src/
├── components/
│   ├── common/
│   │   ├── Navbar.tsx          # 顶部导航栏（Learn/Playground切换）
│   │   ├── Layout.tsx          # 页面布局
│   │   ├── LearnLayout.tsx     # 学习页面布局
│   │   ├── ControlPanel.tsx    # 参数控制面板
│   │   └── MathRenderer.tsx    # KaTeX数学公式组件
│   ├── interference/
│   │   └── InterferenceCanvas.tsx  # 干涉波动画Canvas
│   ├── iq-modulator/
│   │   └── IQCanvas.tsx        # IQ调制器Canvas（星座图+波形）
│   ├── mz-modulator/
│   │   └── MZCanvas.tsx        # MZ调制器Canvas
│   ├── polarization/
│   │   └── PolarizationCanvas.tsx  # 偏振态Canvas
│   └── receiver/
│       └── ReceiverCanvas.tsx  # 接收器Canvas
├── pages/
│   ├── HomePage.tsx
│   ├── learn/
│   │   ├── LearnLightBasics.tsx
│   │   ├── LearnLaser.tsx
│   │   ├── LearnInterference.tsx
│   │   ├── LearnMZModulator.tsx
│   │   ├── LearnIQModulator.tsx
│   │   ├── LearnPolarization.tsx
│   │   ├── LearnDualPolarization.tsx
│   │   ├── LearnReceiver.tsx
│   │   └── LearnGlossary.tsx
│   └── playground/
│       ├── InterferencePage.tsx
│       ├── MZModulatorPage.tsx
│       ├── IQModulatorPage.tsx
│       ├── PolarizationPage.tsx
│       └── ReceiverPage.tsx
├── stores/
│   ├── useInterferenceStore.ts
│   ├── useMZStore.ts
│   ├── useIQStore.ts           # 含modulationFormat/symbolIndex/iComponent/qComponent/pPhaseDiff
│   ├── usePolarizationStore.ts
│   └── useReceiverStore.ts
├── hooks/
│   ├── useAnimationFrame.ts    # 动画帧钩子
│   └── useCanvas.ts            # Canvas渲染钩子
├── utils/
│   ├── waveMath.ts             # 波动数学函数
│   ├── modulationMath.ts       # IQ点/幅度/相位/EVM/BER函数
│   └── colors.ts               # 颜色配置
├── lib/
│   └── utils.ts                # 工具函数cn()
├── App.tsx
└── main.tsx
```

## 5. 状态管理设计

每个可视化模块都有独立的状态管理：

### 5.1 干涉模块状态 (useInterferenceStore)
```typescript
interface InterferenceState {
  wavelength: number;      // 波长 (nm)
  amplitude: number;       // 振幅
  phaseDiff: number;       // 相位差
  isPlaying: boolean;      // 播放状态
}
```

### 5.2 MZ调制器状态 (useMZStore)
```typescript
interface MZState {
  modulationDepth: number; // 调制深度 (0-1)
  phaseShift: number;      // 相位偏移
  inputPower: number;      // 输入功率
  armLengthDiff: number;   // 两臂长度差
}
```

### 5.3 IQ调制器状态 (useIQStore)
```typescript
interface IQState {
  modulationFormat: 'QPSK' | '16QAM' | '64QAM';
  symbolIndex: number;     // 当前符号索引
  autoCycle: boolean;      // 自动循环符号
  iComponent: number;      // I分量 (-1~1)
  qComponent: number;      // Q分量 (-1~1)
  isPlaying: boolean;      // 播放状态
  time: number;            // 动画时间
  pPhaseDiff: number;      // P相位差 (0~π)
}
```

### 5.4 偏振复用状态 (usePolarizationStore)
```typescript
interface PolarizationState {
  stokesS0: number;        // 斯托克斯S0
  stokesS1: number;        // 斯托克斯S1
  stokesS2: number;        // 斯托克斯S2
  stokesS3: number;        // 斯托克斯S3
  xPower: number;          // X通道功率
  yPower: number;          // Y通道功率
}
```

### 5.5 接收器状态 (useReceiverStore)
```typescript
interface ReceiverState {
  modulationFormat: 'QPSK' | '16QAM' | '64QAM';
  snr: number;             // 信噪比 (dB)
  isPlaying: boolean;
}
```

## 6. 核心数学函数

### 6.1 光波干涉
```
I = I1 + I2 + 2√(I1·I2)cos(Δφ)
Δφ = (2π/λ)·Δx + Δφ0
```

### 6.2 MZ调制器
```
E_out = E_in · cos(Δφ/2) · e^(i·Δφ/2)
输出功率: P_out = P_in · cos²(Δφ/2)
调制: Δφ = π·V/Vπ
```

### 6.3 IQ调制器
```
s(t) = I·cos(ωt) + Q·cos(ωt - Δφ)
当 Δφ = π/2 时: s(t) = I·cos(ωt) + Q·sin(ωt)
接收端: I_dec = I + Q·cos(Δφ), Q_dec = Q·sin(Δφ)
```

### 6.4 斯托克斯矢量
```
S0 = Ex² + Ey²
S1 = Ex² - Ey²
S2 = 2·Ex·Ey·cos(δ)
S3 = 2·Ex·Ey·sin(δ)
偏振度: DOP = √(S1² + S2² + S3²) / S0
```

## 7. Canvas渲染策略

- 使用 `requestAnimationFrame` 实现60fps动画
- 波形直接使用 Canvas 2D API 绘制
- 星座图点使用 `fillRect`/`arc` 绘制
- 响应式Canvas尺寸调整（支持 DPR）

## 8. 性能优化

- 使用 Zustand 选择性订阅避免不必要渲染
- Canvas 绘制使用 `useEffect` + `useRef` 管理
- 动画状态（time）单独管理
- 不使用 React.memo 等优化（Canvas 自身管理绘制）

## 9. 部署方案

### 9.1 GitHub Pages 自动部署

项目使用 GitHub Actions 实现合并到 `main` 分支后自动构建并部署到 GitHub Pages。

#### 工作流配置
- **配置文件**: `.github/workflows/deploy.yml`
- **触发条件**: push 到 `main` 分支，或手动触发 (`workflow_dispatch`)
- **构建环境**: Ubuntu latest + Node.js 20 + pnpm 9

#### 部署流程
```mermaid
graph LR
    A["Push to main"] --> B["Checkout 代码"]
    B --> C["安装 pnpm"]
    C --> D["安装依赖"]
    D --> E["构建项目 (pnpm build)"]
    E --> F["上传构建产物"]
    F --> G["部署到 GitHub Pages"]
```

#### Vite 配置说明
- 构建时通过环境变量 `VITE_BASE_PATH` 设置 base 路径，值为仓库名 (`/仓库名/`)
- `vite.config.ts` 中需读取 `process.env.VITE_BASE_PATH || '/'` 作为 base 配置
- 使用 `HashRouter` 适配 GitHub Pages

#### 仓库设置要求
在 GitHub 仓库 Settings → Pages 中：
- Source 选择 **GitHub Actions**
- 无需手动配置分支和目录，由 Actions 自动管理

### 9.2 构建产物

- 输出目录: `dist/`
- 包含静态 HTML、CSS、JS 和资源文件
- 构建命令: `pnpm build`
