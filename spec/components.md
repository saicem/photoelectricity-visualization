# 组件结构

```
src/
├── components/
│   ├── common/
│   │   ├── Navbar.tsx          # 顶部导航栏（Learn/Playground 切换）
│   │   ├── Layout.tsx          # 页面布局
│   │   ├── LearnLayout.tsx     # 学习页面布局（章节导航、上/下一章）
│   │   ├── ControlPanel.tsx    # 参数控制面板（Slider/Select/InfoItem）
│   │   ├── MathRenderer.tsx    # KaTeX 数学公式组件
│   │   └── TermNote.tsx        # 页内注释弹出组件
│   ├── interference/
│   │   └── InterferenceCanvas.tsx  # 干涉波动画 Canvas
│   ├── iq-modulator/
│   │   └── IQCanvas.tsx        # IQ 调制器 Canvas（星座图 + 波形）
│   ├── mz-modulator/
│   │   └── MZCanvas.tsx        # MZ 调制器 Canvas（三种模式可视化）
│   ├── polarization/
│   │   └── PolarizationCanvas.tsx  # 偏振态 Canvas（庞加莱球）
│   └── receiver/
│       └── ReceiverCanvas.tsx  # 接收器 Canvas
├── pages/
│   ├── HomePage.tsx            # 首页
│   ├── learn/                  # 9 个学习页面
│   └── playground/             # 5 个实验页面
├── stores/                     # Zustand 状态管理
├── hooks/                      # 自定义 Hook
├── utils/                      # 工具函数
├── lib/                        # 基础工具
├── data/                       # 数据源（glossaryData.ts）
├── App.tsx
└── main.tsx
```
