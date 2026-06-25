import { create } from 'zustand';
import type { ModulationFormat } from '@/utils/modulationMath';
import { getSymbols } from '@/utils/modulationMath';

export interface ReceivedPoint {
  i: number;
  q: number;
}

interface IQState {
  modulationFormat: ModulationFormat;
  symbolIndex: number;
  autoCycle: boolean;
  iComponent: number;
  qComponent: number;
  isPlaying: boolean;
  time: number;
  snr: number;
  noiseEnabled: boolean;
  receivedPoints: ReceivedPoint[];
  maxReceivedPoints: number;
  setModulationFormat: (v: ModulationFormat) => void;
  setSymbolIndex: (v: number) => void;
  setAutoCycle: (v: boolean) => void;
  setIComponent: (v: number) => void;
  setQComponent: (v: number) => void;
  setIsPlaying: (v: boolean) => void;
  setTime: (v: number) => void;
  setSnr: (v: number) => void;
  setNoiseEnabled: (v: boolean) => void;
  addReceivedPoint: (point: ReceivedPoint) => void;
  clearReceivedPoints: () => void;
  reset: () => void;
}

function gaussianRandom(): number {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

export const useIQStore = create<IQState>((set, get) => ({
  modulationFormat: '16QAM',
  symbolIndex: 5,
  autoCycle: false,
  iComponent: 0.33,
  qComponent: 0.33,
  isPlaying: true,
  time: 0,
  snr: 15,
  noiseEnabled: true,
  receivedPoints: [],
  maxReceivedPoints: 300,
  setModulationFormat: (v) => {
    const symbols = getSymbols(v);
    const idx = Math.min(get().symbolIndex, symbols.length - 1);
    const s = symbols[idx];
    set({
      modulationFormat: v,
      symbolIndex: idx,
      iComponent: s.i,
      qComponent: s.q,
      receivedPoints: [],
    });
  },
  setSymbolIndex: (v) => {
    const symbols = getSymbols(get().modulationFormat);
    const idx = Math.max(0, Math.min(v, symbols.length - 1));
    const s = symbols[idx];
    set({ symbolIndex: idx, iComponent: s.i, qComponent: s.q });
  },
  setAutoCycle: (v) => set({ autoCycle: v }),
  setIComponent: (v) => set({ iComponent: v }),
  setQComponent: (v) => set({ qComponent: v }),
  setIsPlaying: (v) => set({ isPlaying: v }),
  setTime: (v) => set({ time: v }),
  setSnr: (v) => set({ snr: v }),
  setNoiseEnabled: (v) => set({ noiseEnabled: v, receivedPoints: [] }),
  addReceivedPoint: (point) => {
    const { receivedPoints, maxReceivedPoints } = get();
    const newPoints = [...receivedPoints, point];
    if (newPoints.length > maxReceivedPoints) {
      newPoints.shift();
    }
    set({ receivedPoints: newPoints });
  },
  clearReceivedPoints: () => set({ receivedPoints: [] }),
  reset: () => {
    const symbols = getSymbols('16QAM');
    const s = symbols[5];
    set({
      modulationFormat: '16QAM',
      symbolIndex: 5,
      autoCycle: false,
      iComponent: s.i,
      qComponent: s.q,
      isPlaying: true,
      time: 0,
      snr: 15,
      noiseEnabled: true,
      receivedPoints: [],
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

