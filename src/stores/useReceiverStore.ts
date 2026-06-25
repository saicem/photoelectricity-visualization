import { create } from 'zustand';
import type { ModulationFormat } from '@/utils/modulationMath';
import { getSymbols } from '@/utils/modulationMath';

export interface ReceivedPoint {
  i: number;
  q: number;
}

interface ReceiverState {
  modulationFormat: ModulationFormat;
  snr: number;
  noiseEnabled: boolean;
  isPlaying: boolean;
  receivedPoints: ReceivedPoint[];
  maxReceivedPoints: number;
  errorCount: number;
  totalSymbols: number;
  setModulationFormat: (v: ModulationFormat) => void;
  setSnr: (v: number) => void;
  setNoiseEnabled: (v: boolean) => void;
  setIsPlaying: (v: boolean) => void;
  addReceivedPoint: (point: ReceivedPoint, isError: boolean) => void;
  clearReceivedPoints: () => void;
  reset: () => void;
}

function gaussianRandom(): number {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

export const useReceiverStore = create<ReceiverState>((set, get) => ({
  modulationFormat: '16QAM',
  snr: 15,
  noiseEnabled: true,
  isPlaying: true,
  receivedPoints: [],
  maxReceivedPoints: 500,
  errorCount: 0,
  totalSymbols: 0,
  setModulationFormat: (v) => {
    set({
      modulationFormat: v,
      receivedPoints: [],
      errorCount: 0,
      totalSymbols: 0,
    });
  },
  setSnr: (v) => set({ snr: v, receivedPoints: [], errorCount: 0, totalSymbols: 0 }),
  setNoiseEnabled: (v) => set({ noiseEnabled: v, receivedPoints: [], errorCount: 0, totalSymbols: 0 }),
  setIsPlaying: (v) => set({ isPlaying: v }),
  addReceivedPoint: (point, isError) => {
    const { receivedPoints, maxReceivedPoints, errorCount, totalSymbols } = get();
    const newPoints = [...receivedPoints, point];
    if (newPoints.length > maxReceivedPoints) {
      newPoints.shift();
    }
    set({
      receivedPoints: newPoints,
      errorCount: errorCount + (isError ? 1 : 0),
      totalSymbols: totalSymbols + 1,
    });
  },
  clearReceivedPoints: () => set({ receivedPoints: [], errorCount: 0, totalSymbols: 0 }),
  reset: () => {
    set({
      modulationFormat: '16QAM',
      snr: 15,
      noiseEnabled: true,
      isPlaying: true,
      receivedPoints: [],
      errorCount: 0,
      totalSymbols: 0,
    });
  },
}));

export function addAwgnNoise(i: number, q: number, snrDb: number, noiseEnabled: boolean): ReceivedPoint {
  if (!noiseEnabled) {
    return { i, q };
  }
  const snrLinear = Math.pow(10, snrDb / 10);
  const signalPower = (i * i + q * q) / 2;
  const noisePower = signalPower / snrLinear;
  const noiseStd = Math.sqrt(noisePower);
  return {
    i: i + gaussianRandom() * noiseStd,
    q: q + gaussianRandom() * noiseStd,
  };
}

export function nearestSymbol(point: ReceivedPoint, format: ModulationFormat): { i: number; q: number; index: number } {
  const symbols = getSymbols(format);
  let minDist = Infinity;
  let nearest = symbols[0];
  let nearestIdx = 0;
  symbols.forEach((s, idx) => {
    const dist = (point.i - s.i) ** 2 + (point.q - s.q) ** 2;
    if (dist < minDist) {
      minDist = dist;
      nearest = s;
      nearestIdx = idx;
    }
  });
  return { i: nearest.i, q: nearest.q, index: nearestIdx };
}

export function estimateBer(modulationFormat: ModulationFormat, snrDb: number): number {
  const snrLinear = Math.pow(10, snrDb / 10);
  const bitsPerSymbol = { QPSK: 2, '16QAM': 4, '64QAM': 6 }[modulationFormat];
  const M = Math.pow(2, bitsPerSymbol);

  if (modulationFormat === 'QPSK') {
    return 0.5 * erfc(Math.sqrt(snrLinear));
  } else {
    const k = Math.sqrt(M);
    const avgEsN0 = snrLinear;
    return (
      (2 * (k - 1) / (k * Math.log2(k))) *
      0.5 *
      erfc(Math.sqrt((3 * avgEsN0 * Math.log2(k)) / (M - 1)))
    );
  }
}

function erfc(x: number): number {
  if (x < 0) return 2 - erfc(-x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1.0 / (1.0 + p * x);
  const y =
    1.0 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return y;
}
