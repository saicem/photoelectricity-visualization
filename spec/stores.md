# 状态管理设计

每个可视化模块有独立的状态管理，均使用 Zustand。

## 干涉模块 (useInterferenceStore)

```typescript
interface InterferenceState {
  wavelength: number;      // 波长 (nm)
  amplitude: number;       // 振幅
  phaseDiff: number;       // 相位差
  isPlaying: boolean;      // 播放状态
  time: number;            // 动画时间
}
```

## MZ 调制器 (useMZStore)

```typescript
type ModulationMode = 'single-arm' | 'dual-arm' | 'push-pull';

interface MZState {
  modulationDepth: number;  // 调制深度 (0-π)
  modulationDepth2: number; // 上臂调制深度（双臂模式）
  phaseShift: number;       // 直流偏置
  inputPower: number;       // 输入光功率
  frequency: number;        // 调制频率
  mode: ModulationMode;     // 调制模式
  isPlaying: boolean;
  time: number;
}
```

## IQ 调制器 (useIQStore)

```typescript
interface IQState {
  modulationFormat: 'QPSK' | '16QAM' | '64QAM';
  symbolIndex: number;       // 当前符号索引
  autoCycle: boolean;        // 自动循环符号
  iComponent: number;        // I 分量 (-1~1)
  qComponent: number;        // Q 分量 (-1~1)
  isPlaying: boolean;
  time: number;
  pPhaseDiff: number;        // 相位误差 (0~π)
}
```

## 偏振复用 (usePolarizationStore)

```typescript
interface PolarizationState {
  stokesS0: number;          // 斯托克斯 S0
  stokesS1: number;          // 斯托克斯 S1
  stokesS2: number;          // 斯托克斯 S2
  stokesS3: number;          // 斯托克斯 S3
  xPower: number;            // X 通道功率
  yPower: number;            // Y 通道功率
}
```

## 接收器 (useReceiverStore)

```typescript
interface ReceiverState {
  modulationFormat: 'QPSK' | '16QAM' | '64QAM';
  snr: number;               // 信噪比 (dB)
  isPlaying: boolean;
}
```
