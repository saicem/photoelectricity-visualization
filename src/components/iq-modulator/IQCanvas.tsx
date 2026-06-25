import { useEffect, useRef } from 'react';
import { useIQStore, addAwgnNoise } from '@/stores/useIQStore';
import { getSymbols, iqAmplitude, iqPhase, iqModulation } from '@/utils/modulationMath';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';

export default function IQCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    modulationFormat,
    iComponent,
    qComponent,
    isPlaying,
    autoCycle,
    symbolIndex,
    time,
    snr,
    noiseEnabled,
    receivedPoints,
    setTime,
    setSymbolIndex,
    addReceivedPoint,
  } = useIQStore();
  const lastSwitchRef = useRef(0);
  const lastNoiseRef = useRef(0);

  useAnimationFrame(
    (deltaTime) => {
      if (isPlaying) {
        const newTime = time + deltaTime * 0.001;
        setTime(newTime);

        if (autoCycle) {
          if (newTime - lastSwitchRef.current > 0.8) {
            const symbols = getSymbols(modulationFormat);
            setSymbolIndex((symbolIndex + 1) % symbols.length);
            lastSwitchRef.current = newTime;
          }
        }

        if (noiseEnabled && newTime - lastNoiseRef.current > 0.03) {
          const noisy = addAwgnNoise(iComponent, qComponent, snr, noiseEnabled);
          addReceivedPoint(noisy);
          lastNoiseRef.current = newTime;
        }
      }
    },
    { autoStart: true }
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const W = rect.width;
    const H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.3)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.restore();

    const constellationW = W * 0.25;
    const constellationR = constellationW / 2 - 20;
    const txConstX = constellationW / 2 + 10;
    const rxConstX = W / 2 - 10;
    const constellationY = H * 0.32;

    function drawConstellation(
      cx: number,
      cy: number,
      r: number,
      title: string,
      titleColor: string,
      showIdeal: boolean,
      showReceived: boolean,
      showActive: boolean
    ) {
      ctx.save();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - r - 10, cy);
      ctx.lineTo(cx + r + 10, cy);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy - r - 10);
      ctx.lineTo(cx, cy + r + 10);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText('I', cx + r + 2, cy + 4);
      ctx.fillText('Q', cx + 4, cy - r - 4);

      const symbols = getSymbols(modulationFormat);

      if (showIdeal) {
        symbols.forEach((s, idx) => {
          const px = cx + s.i * r;
          const py = cy - s.q * r;
          const isActive = idx === symbolIndex;

          if (isActive && showActive) {
            ctx.fillStyle = '#00ff88';
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(px, py, 5, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = '#475569';
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.shadowBlur = 0;
      }

      if (showReceived && receivedPoints.length > 0) {
        receivedPoints.forEach((p, idx) => {
          const px = cx + p.i * r;
          const py = cy - p.q * r;
          const alpha = 0.2 + 0.6 * (idx / receivedPoints.length);
          ctx.fillStyle = `rgba(255, 107, 107, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        });

        const lastPoint = receivedPoints[receivedPoints.length - 1];
        if (lastPoint) {
          const px = cx + lastPoint.i * r;
          const py = cy - lastPoint.q * r;
          ctx.fillStyle = '#ff6b6b';
          ctx.shadowColor = '#ff6b6b';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      ctx.fillStyle = titleColor;
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.fillText(title, cx - r, cy - r - 18);

      if (showActive && showIdeal) {
        const activeSymbol = symbols[symbolIndex];
        if (activeSymbol) {
          const amp = iqAmplitude(activeSymbol.i, activeSymbol.q);
          const phase = iqPhase(activeSymbol.i, activeSymbol.q);
          ctx.fillStyle = '#f59e0b';
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillText(`A=${amp.toFixed(2)}`, cx - r, cy + r + 16);
          ctx.fillText(`φ=${(phase * 180 / Math.PI).toFixed(0)}°`, cx + 10, cy + r + 16);
        }
      }

      ctx.restore();
    }

    drawConstellation(txConstX, constellationY, constellationR, '发送端', '#00d4ff', true, false, true);
    drawConstellation(rxConstX, constellationY, constellationR, '接收端', '#ff6b6b', true, true, false);

    const waveformX = 20;
    const waveformW = W - 40;
    const waveTop = H * 0.6;
    const waveH = 28;
    const waveGap = 10;

    function drawWave(
      x: number,
      y: number,
      width: number,
      height: number,
      color: string,
      label: string,
      getValue: (t: number) => number,
      maxVal: number = 1,
      showNoise: boolean = false
    ) {
      ctx.save();

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y - height, width, height * 2);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      if (showNoise && noiseEnabled) {
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const cycles = 8;
        for (let i = 0; i <= width; i++) {
          const t = (i / width) * cycles * 2 * Math.PI + time * 4;
          const clean = getValue(t);
          const noisy = addAwgnNoise(clean / maxVal, 0, snr, true).i * maxVal;
          const py = y - (noisy / maxVal) * height * 0.8;
          if (i === 0) ctx.moveTo(x + i, py);
          else ctx.lineTo(x + i, py);
        }
        ctx.stroke();
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const cycles = 8;
      for (let i = 0; i <= width; i++) {
        const t = (i / width) * cycles * 2 * Math.PI + time * 4;
        const val = getValue(t);
        const py = y - (val / maxVal) * height * 0.8;
        if (i === 0) ctx.moveTo(x + i, py);
        else ctx.lineTo(x + i, py);
      }
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(label, x + 5, y - height - 3);

      ctx.restore();
    }

    const I = iComponent;
    const Q = qComponent;

    const waveY1 = waveTop;
    const waveY2 = waveTop + (waveH * 2 + waveGap);
    const waveY3 = waveTop + (waveH * 2 + waveGap) * 2;

    drawWave(waveformX, waveY1, waveformW, waveH, '#00d4ff', 'I 路 (同相)', (t) => I * Math.cos(t), 1, true);
    drawWave(waveformX, waveY2, waveformW, waveH, '#a855f7', 'Q 路 (正交)', (t) => Q * Math.sin(t), 1, true);
    drawWave(waveformX, waveY3, waveformW, waveH, '#00ff88', '输出信号', (t) => iqModulation(I, Q, t), Math.sqrt(2), true);

    const totalAmp = iqAmplitude(I, Q);
    const totalPhase = iqPhase(I, Q);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(`幅度: ${totalAmp.toFixed(3)}`, waveformX, waveY3 + waveH + 16);
    ctx.fillText(`相位: ${(totalPhase * 180 / Math.PI).toFixed(1)}°`, waveformX + 100, waveY3 + waveH + 16);
    ctx.fillText(`SNR: ${snr.toFixed(1)} dB`, waveformX + 220, waveY3 + waveH + 16);
    ctx.fillText(`采样点: ${receivedPoints.length}`, waveformX + 340, waveY3 + waveH + 16);

    return () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [modulationFormat, iComponent, qComponent, time, symbolIndex, snr, noiseEnabled, receivedPoints]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-xl"
      style={{ display: 'block' }}
    />
  );
}
