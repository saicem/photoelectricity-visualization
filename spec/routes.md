# 路由定义

路由路径统一由 `src/constants/routes.ts` 中的 `ROUTES` 常量管理。所有页面组件均通过常量引用路径，不得硬编码。

| 路由 key | 路径 | 页面组件 | 描述 |
|----------|------|----------|------|
| `ROUTES.HOME` | `/` | HomePage | 首页，按 Part 分组展示模块入口 |
| `ROUTES.LEARN.PHYSICS_BASICS` | `/learn/physics-basics` | LearnPhysicsBasics | 基础物理定义（Part 1） |
| `ROUTES.LEARN.LIGHT_BASICS` | `/learn/light-basics` | LearnLightBasics | 光波基础（Part 1） |
| `ROUTES.LEARN.LASER` | `/learn/laser` | LearnLaser | 激光器原理（Part 2） |
| `ROUTES.LEARN.INTERFERENCE` | `/learn/interference` | LearnInterference | 干涉原理（Part 3） |
| `ROUTES.LEARN.MZ_MODULATOR` | `/learn/mz-modulator` | LearnMZModulator | MZ 调制器（Part 3） |
| `ROUTES.LEARN.IQ_MODULATOR` | `/learn/iq-modulator` | LearnIQModulator | IQ 调制器（Part 3） |
| `ROUTES.LEARN.POLARIZATION` | `/learn/polarization` | LearnPolarization | 偏振复用（Part 3） |
| `ROUTES.LEARN.DUAL_POLARIZATION` | `/learn/dual-polarization` | LearnDualPolarization | 高级调制（Part 3） |
| `ROUTES.LEARN.RECEIVER` | `/learn/receiver` | LearnReceiver | 光接收器（Part 4） |
| `ROUTES.LEARN.GLOSSARY` | `/learn/glossary` | LearnGlossary | 术语表（附录） |
| `ROUTES.PLAYGROUND.INTERFERENCE` | `/playground/interference` | InterferencePage | 光波干涉实验 |
| `ROUTES.PLAYGROUND.MZ_MODULATOR` | `/playground/mz-modulator` | MZModulatorPage | MZ 调制器实验 |
| `ROUTES.PLAYGROUND.IQ_MODULATOR` | `/playground/iq-modulator` | IQModulatorPage | IQ 调制器实验 |
| `ROUTES.PLAYGROUND.POLARIZATION` | `/playground/polarization` | PolarizationPage | 偏振复用实验 |
| `ROUTES.PLAYGROUND.RECEIVER` | `/playground/receiver` | ReceiverPage | 光接收器实验 |

## 章节索引

章节顺序与索引由 `src/constants/chapters.ts` 中的 `CHAPTERS` 数组统一管理。各 Learn 页面通过 `CHAPTERS.findIndex()` 自动计算 `currentIndex`，无需手动维护。
