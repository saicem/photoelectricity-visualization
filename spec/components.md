# 组件结构

```
src/
├── components/
│   ├── common/
│   │   ├── Navbar.tsx             # 顶部导航栏（Learn/Playground 切换，侧边目录）
│   │   ├── Layout.tsx             # 页面布局
│   │   ├── LearnLayout.tsx        # 学习页面布局（篇章面包屑、上/下一章）
│   │   ├── LearnSection.tsx       # 学习页面 section 容器（封装重复卡片样式）
│   │   ├── PlaygroundLayout.tsx   # 实验页面布局（Header + Canvas/ControlPanel 网格 + 原理说明）
│   │   ├── ControlPanel.tsx       # 参数控制面板（SliderControl/SelectControl/InfoItem）
│   │   ├── MathRenderer.tsx       # KaTeX 数学公式组件
│   │   ├── TermNote.tsx           # 页内注释弹出组件
│   │   └── ScrollToTop.tsx        # 路由切换时自动滚动到页面顶部
│   ├── interference/
│   │   └── InterferenceCanvas.tsx   # 干涉波动画 Canvas
│   ├── iq-modulator/
│   │   └── IQCanvas.tsx           # IQ 调制器 Canvas（星座图 + 波形）
│   ├── mz-modulator/
│   │   └── MZCanvas.tsx           # MZ 调制器 Canvas（三种模式可视化）
│   ├── polarization/
│   │   └── PolarizationCanvas.tsx   # 偏振态 Canvas（庞加莱球 + 偏振椭圆）
│   └── receiver/
│       └── ReceiverCanvas.tsx     # 接收器 Canvas（星座图 + BER/SNR 曲线）
├── pages/
│   ├── HomePage.tsx               # 首页（按篇章分组展示学习模块）
│   ├── learn/                     # 10 个章节页面
│   └── playground/                # 5 个实验页面
├── stores/                        # Zustand 状态管理（5 个 store）
├── hooks/                         # 自定义 Hook（useAnimationFrame）
├── utils/                         # 数学工具函数
├── lib/                           # 基础工具（cn, setupCanvas, drawGrid）
├── constants/                     # 路由常量（ROUTES）和章节常量（CHAPTERS）
├── types/                         # 共享类型定义（IQPoint, ModulationFormat）
├── data/                          # 数据源（glossaryData.ts）
├── App.tsx                        # 路由注册 + ScrollToTop
└── main.tsx                       # 入口
```

## 公共组件说明

| 组件 | 文件 | 用途 |
|------|------|------|
| **Navbar** | `common/Navbar.tsx` | 左侧固定侧边栏，目录按 Part 分组展示 |
| **Layout** | `common/Layout.tsx` | 页面外层布局（Navbar + Outlet） |
| **LearnLayout** | `common/LearnLayout.tsx` | 学习页面通用布局：面包屑导航（含篇名）、页码、上下章导航 |
| **LearnSection** | `common/LearnSection.tsx` | 封装学习页面中重复的 section 卡片样式（bg + border + rounded + p-6 + h2） |
| **PlaygroundLayout** | `common/PlaygroundLayout.tsx` | 实验页面通用布局：Header（图标+标题+返回学习按钮）+ lg:grid-cols-[1fr_320px] 主区域 + 底部原理说明 |
| **ControlPanel** | `common/ControlPanel.tsx` | 参数控制面板：SliderControl、SelectControl、InfoItem 三个子组件 |
| **MathRenderer** | `common/MathRenderer.tsx` | KaTeX 公式渲染 |
| **TermNote** | `common/TermNote.tsx` | 术语悬停弹出注释，使用 createPortal 渲染 |
| **ScrollToTop** | `common/ScrollToTop.tsx` | 监听 useLocation().pathname，路由切换时自动 scrollTo(0,0) |

## 目录结构说明

- `constants/`：集中管理路由路径字符串（ROUTES）和章节顺序/索引（CHAPTERS），所有页面从常量导入，修改路由或增删章节时只需改一处
- `types/`：共享类型定义（IQPoint, ModulationFormat），避免类型定义散落在 utils 层
- `lib/`：纯工具函数，包括 `cn()`（tailwind-merge）、`setupCanvas()`（Canvas DPR 缩放）、`drawGrid()`（Canvas 背景网格绘制）
