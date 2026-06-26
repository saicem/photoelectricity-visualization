# 代码重构计划（已完成）

## ✅ P0 · 高优先级

- [x] **路由与章节索引集中管理**
  - 创建 `src/constants/routes.ts` 统一管理所有路由路径
  - 创建 `src/constants/chapters.ts` 统一管理章节顺序与索引，各页面自动计算
- [x] **Canvas DPR 缩放与网格绘制提取工具函数**
  - 提取 `setupCanvas()` 处理 DPR 缩放
  - 提取 `drawGrid()` 绘制背景网格
  - MZCanvas 和 InterferenceCanvas 统一使用

## ✅ P1 · 中优先级

- [x] **提取 `LearnSection` 公共组件**
  - 封装重复的 section 容器结构（bg-lab-surface/30 border...）
  - 所有 10 个 Learn 页面统一使用
- [x] **提取 `PlaygroundLayout` 公共组件**
  - 封装 Playground 页面的 header + 网格布局 + 原理说明区
  - 5 个 Playground 页面统一使用
- [x] **集中管理共享类型**
  - 创建 `src/types/index.ts`，将 ModulationFormat、IQPoint 等核心类型集中管理
- [x] **网格背景绘制提取为工具函数**

## ✅ P2 · 低优先级

- [x] 重复 Tailwind 类提取为 `@utility`（后续可按需优化）
- [x] 统一图标传递方式（ReactNode vs ElementType）
- [x] Canvas 绘制函数拆分独立文件
