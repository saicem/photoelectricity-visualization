# 技术架构

## 架构图

```
graph TB
    subgraph 前端层
        A[React Router 页面路由] --> B[Zustand 状态管理]
        B --> C[可视化组件层]
        C --> D[Canvas 2D 渲染引擎]
        C --> E[动画控制器]
    end
    subgraph 样式层
        F[Tailwind CSS 工具类样式] --> C
        G[CSS 动画过渡效果] --> C
    end
    subgraph 工具层
        H[Lucide React 图标库]
        I[clsx 类名工具]
        J[KaTeX 数学公式渲染]
    end
```

## 技术选型

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.x | UI 框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 5.x | 构建工具 |
| Tailwind CSS | 3.x | 样式框架 |
| Zustand | 4.x | 状态管理 |
| React Router | 6.x | 页面路由 |
| Lucide React | 最新 | 图标库 |
| Framer Motion | 11.x | 动画库 |
| KaTeX | 最新 | 数学公式渲染 |

## Canvas 渲染策略

- 使用 `requestAnimationFrame` 实现 60fps 动画
- 波形使用 Canvas 2D API 直接绘制
- 星座图点使用 `fillRect`/`arc` 绘制
- 响应式 Canvas 尺寸调整（支持 DPR）

## 性能优化

- Zustand 选择性订阅避免不必要渲染
- Canvas 绘制使用 `useEffect` + `useRef` 管理
- 动画状态（time）单独管理
- 使用 `createPortal` 处理弹层（TermNote）避免父容器裁剪
