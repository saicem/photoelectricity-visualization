export interface IQPoint {
  i: number;
  q: number;
}

export interface HeaterState {
  voltage: number;
  current: number;
}

export function heaterPower(h: HeaterState): number {
  return h.voltage * h.current;
}

export function heaterPhaseShift(h: HeaterState, vPi: number = 5): number {
  const power = heaterPower(h);
  const normalizedPower = power / 100;
  return normalizedPower * Math.PI * (5 / vPi);
}

export function mzOutputPower(inputPower: number, phaseShift: number): number {
  return inputPower * Math.cos(phaseShift / 2) ** 2;
}

export function iqModulation(iComponent: number, qComponent: number, t: number): number {
  return iComponent * Math.cos(t) + qComponent * Math.sin(t);
}

export function iqAmplitude(i: number, q: number): number {
  return Math.sqrt(i * i + q * q);
}

export function iqPhase(i: number, q: number): number {
  return Math.atan2(q, i);
}

export const qpskSymbols: IQPoint[] = [
  { i: 1, q: 1 },
  { i: -1, q: 1 },
  { i: -1, q: -1 },
  { i: 1, q: -1 },
];

export const qam16Symbols: IQPoint[] = [];
for (let i = -3; i <= 3; i += 2) {
  for (let q = -3; q <= 3; q += 2) {
    qam16Symbols.push({ i: i / 3, q: q / 3 });
  }
}

export const qam64Symbols: IQPoint[] = [];
for (let i = -7; i <= 7; i += 2) {
  for (let q = -7; q <= 7; q += 2) {
    qam64Symbols.push({ i: i / 7, q: q / 7 });
  }
}

export type ModulationFormat = 'QPSK' | '16QAM' | '64QAM';

export function getSymbols(format: ModulationFormat): IQPoint[] {
  switch (format) {
    case 'QPSK': return qpskSymbols;
    case '16QAM': return qam16Symbols;
    case '64QAM': return qam64Symbols;
  }
}

export interface DPResult {
  xI: number;
  xQ: number;
  yI: number;
  yQ: number;
  xPower: number;
  yPower: number;
  xPhaseError: number;
  yPhaseError: number;
  xImerror: number;
  yImerror: number;
  extinctionRatio: number;
}

export function calcDPIQ(
  inputPower: number,
  xSymbol: IQPoint,
  ySymbol: IQPoint,
  xIBiasPhase: number,
  xQBiasPhase: number,
  xQuadraturePhase: number,
  yIBiasPhase: number,
  yQBiasPhase: number,
  yQuadraturePhase: number,
  polRotation: number
): DPResult {
  const xIPhase = Math.PI * xSymbol.i + xIBiasPhase;
  const xQPhase = Math.PI * xSymbol.q + xQBiasPhase;

  const xIOut = mzOutputPower(inputPower / 4, xIPhase);
  const xQOut = mzOutputPower(inputPower / 4, xQPhase);

  const xIQAngle = Math.PI / 2 + xQuadraturePhase;
  const xPower = xIOut + xQOut + 2 * Math.sqrt(xIOut * xQOut) * Math.cos(xIQAngle) * Math.sign(xSymbol.i * xSymbol.q);

  const yIPhase = Math.PI * ySymbol.i + yIBiasPhase;
  const yQPhase = Math.PI * ySymbol.q + yQBiasPhase;

  const yIOut = mzOutputPower(inputPower / 4, yIPhase);
  const yQOut = mzOutputPower(inputPower / 4, yQPhase);

  const yIQAngle = Math.PI / 2 + yQuadraturePhase;
  const yPower = yIOut + yQOut + 2 * Math.sqrt(yIOut * yQOut) * Math.cos(yIQAngle) * Math.sign(ySymbol.i * ySymbol.q);

  // 偏振旋转：使用旋转矩阵混合 X 和 Y 分量
  const cosRot = Math.cos(polRotation);
  const sinRot = Math.sin(polRotation);
  const xIAfterRot = xSymbol.i * cosRot - ySymbol.i * sinRot;
  const xQAfterRot = xSymbol.q * cosRot - ySymbol.q * sinRot;
  const yIAfterRot = xSymbol.i * sinRot + ySymbol.i * cosRot;
  const yQAfterRot = xSymbol.q * sinRot + ySymbol.q * cosRot;

  // 考虑偏振旋转后的功率
  const xPowerAfterRot = xPower * cosRot * cosRot + yPower * sinRot * sinRot;
  const yPowerAfterRot = xPower * sinRot * sinRot + yPower * cosRot * cosRot;

  return {
    xI: xIAfterRot,
    xQ: xQAfterRot,
    yI: yIAfterRot,
    yQ: yQAfterRot,
    xPower: Math.abs(xPowerAfterRot),
    yPower: Math.abs(yPowerAfterRot),
    xPhaseError: xQuadraturePhase,
    yPhaseError: yQuadraturePhase,
    xImerror: xIBiasPhase / Math.PI,
    yImerror: yIBiasPhase / Math.PI,
    extinctionRatio: inputPower > 0.001
      ? 10 * Math.log10(inputPower / Math.max(Math.min(xPowerAfterRot, yPowerAfterRot), 0.0001))
      : 0,
  };
}
