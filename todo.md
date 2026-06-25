# 光通信调制实验室 - 项目优化待办清单

## ✅ 已完成

### 高优先级
- [x] **修复所有 Lint 错误**：修复了 MathRenderer、MZCanvas、IQCanvas、PolarizationCanvas、useCanvas、useAnimationFrame、dualPolarizationMath 中的 7 个 error 和 2 个 warning
- [x] **统一 Playground 页面目录**：将 4 个 Playground 页面从 `src/pages/` 根目录移动到 `src/pages/playground/` 目录
- [x] **删除空文件**：删除了 `src/pages/Home.tsx`（空组件）
- [x] **清理冗余路由**：移除了 `App.tsx` 中的旧路径路由（`/interference`、`/mz-modulator` 等），统一使用 `/playground/xxx` 路径
- [x] **实现双偏振 IQ 调制器的偏振旋转功能**：使用旋转矩阵计算 X 和 Y 偏振分量的混合，偏振旋转加热器现在有实际效果
- [x] **Learn 与 Playground 互相跳转**：
  - 6 个 Learn 页面添加了"去实验"按钮，跳转到对应 Playground
  - 6 个 Playground 页面添加了"学习原理"按钮，跳转到对应 Learn 页面

### 中优先级
- [x] **移动端导航优化**：导航图标下方增加文字标签，提升移动端用户体验
- [x] **统一 Playground 页面布局**：所有 6 个 Playground 页面的 Canvas 容器高度统一为 `h-[480px]`
- [x] **接收器 Playground 增强**：
  - 增加 EVM（误差向量幅度）计算和实时显示
  - 增加 BER vs SNR 理论曲线图（QPSK/16QAM/64QAM）
  - 增加 3 个预设场景按钮（背靠背、临界工作点、低信噪比）

### 低优先级
- [x] **增加术语表页面**：包含 6 个分类、34 个光通信术语，支持搜索和展开/收起详情
- [x] **增加 CI 工作流**：GitHub Actions 自动运行 lint、type check、build 检查

---

## 📋 剩余待办（长期规划）

### 中优先级
- [ ] **Learn 页面增加交互式演示**：在 Learn 页面中嵌入小型交互式演示
- [ ] **增加章节测验/小问题**：每个 Learn 章节末尾增加 1-2 个小问题
- [ ] **增加参考资料链接**：在各章节末尾推荐相关论文、标准或延伸阅读材料
- [ ] **增加单元测试**：为数学工具函数添加单元测试
- [ ] **增加 E2E 测试**：使用 Playwright 或 Cypress 进行端到端测试

### 低优先级
- [ ] **双偏振 IQ Playground 增强**：
  - 增加庞加莱球显示偏振态
  - 增加眼图显示
  - 增加各 MZM 偏置点的自动寻优功能
- [ ] **增加数据导出功能**：支持导出仿真数据（CSV/JSON 格式）
- [ ] **增加页面加载骨架屏**：改善首屏和页面切换时的视觉体验
- [ ] **优化控制面板响应式**：在小屏幕上控制面板改为底部抽屉式布局
- [ ] **增加暗色/亮色主题切换**：支持亮色模式
- [ ] **增加动画性能优化**：Canvas 动画使用 OffscreenCanvas 或 Web Worker
- [ ] **增加键盘快捷键支持**：如空格键播放/暂停，R 键重置等
- [ ] **增加中文/英文双语切换**：支持中英文内容切换
- [ ] **增加公式推导详解**：对重要公式提供更详细的推导过程
- [ ] **更新项目名称**：`package.json` 中的 name 字段可考虑更新
- [ ] **Bundle 体积优化**：分析并优化构建产物大小
- [ ] **增加 PWA 支持**：支持离线访问和添加到主屏幕
- [ ] **增加错误边界**：添加 React Error Boundary 处理运行时错误
