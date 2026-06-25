import { useEffect, useRef } from 'react';
import { useIQStore } from '@/stores/useIQStore';
import { getSymbols, iqAmplitude, iqPhase, iqModulation } from '@/utils/modulationMath';
import { useAnimationFrame } from '@/hooks/useAnimationFrame';

export default function IQCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { modulationFormat, iComponent, qComponent, isPlaying, autoCycle, symbolIndex, time, setTime, setSymbolIndex } = useIQStore();
  const lastSwitchRef = useRef(0);

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

    const constellationSize = Math.min(W * 0.28, H * 0.4);
    const constellationR = constellationSize / 2 - 20;
    const txConstX = W * 0.18;
    const rxConstX = W * 0.82;
    const constellationY = H * 0.28;

    function drawConstellation(
      cx: number,
      cy: number,
      r: number,
      title: string,
      titleColor: string,
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

      symbols.forEach((s, idx) => {
        const px = cx + s.i * r;
        const py = cy - s.q * r;
        const isActive = idx === symbolIndex;

        if (isActive && showActive) {
          ctx.fillStyle = '#00ff88';
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#334155';
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.shadowBlur = 0;

      if (showActive) {
        const activeSymbol = symbols[symbolIndex];
        if (activeSymbol) {
          const px = cx + activeSymbol.i * r;
          const py = cy - activeSymbol.q * r;

          ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, cy);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(px, cy);
          ctx.lineTo(px, py);
          ctx.stroke();

          ctx.setLineDash([]);

          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.stroke();
          ctx.shadowBlur = 0;

          const amp = iqAmplitude(activeSymbol.i, activeSymbol.q);
          const phase = iqPhase(activeSymbol.i, activeSymbol.q);

          ctx.fillStyle = '#f59e0b';
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillText(`A=${amp.toFixed(2)}`, cx - r, cy + r + 18);
          ctx.fillText(`φ=${(phase * 180 / Math.PI).toFixed(0)}°`, cx + 10, cy + r + 18);
        }
      }

      ctx.fillStyle = titleColor;
      ctx.font = 'bold 12px JetBrains Mono, monospace';
      ctx.fillText(title, cx - r, cy - r - 20);
      ctx.restore();
    }

    drawConstellation(txConstX, constellationY, constellationR, '发送端', '#00d4ff', true);
    drawConstellation(rxConstX, constellationY, constellationR, '接收端（解码后）', '#00ff88', true);

    const arrowY = constellationY;
    ctx.save();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(txConstX + constellationR + 15, arrowY);
    ctx.lineTo(rxConstX - constellationR - 15, arrowY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rxConstX - constellationR - 15, arrowY);
    ctx.lineTo(rxConstX - constellationR - 22, arrowY - 5);
    ctx.moveTo(rxConstX - constellationR - 15, arrowY);
    ctx.lineTo(rxConstX - constellationR - 22, arrowY + 5);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('光纤传输 + 相干接收', W / 2, arrowY - 12);
    ctx.textAlign = 'left';
    ctx.restore();

    const waveformX = W * 0.05;
    const waveformW = W * 0.9;
    const waveTop = H * 0.55;
    const waveH = 40;
    const waveGap = 12;

    function drawWave(
      x: number,
      y: number,
      width: number,
      height: number,
      color: string,
      label: string,
      getValue: (t: number) => number,
      maxVal: number = 1
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

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const cycles = 10;
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
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(label, x + 5, y - height - 5);

      ctx.restore();
    }

    const I = iComponent;
    const Q = qComponent;

    const waveY1 = waveTop;
    const waveY2 = waveTop + (waveH * 2 + waveGap);

    drawWave(waveformX, waveY1, waveformW, waveH, '#00d4ff', 'I 路 (同相载波)', (t) => Math.cos(t), 1);

    const midDivider = waveY1 + waveH + waveGap / 2;
    ctx.save();
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.moveTo(waveformX, midDivider);
    ctx.lineTo(waveformX + waveformW, midDivider);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    drawWave(waveformX, waveY2, waveformW, waveH, '#a855f7', 'Q 路 (正交载波，90°相移)', (t) => Math.sin(t), 1);

    const outWaveY = waveTop + (waveH * 2 + waveGap) * 2;
    drawWave(waveformX, outWaveY, waveformW, waveH, '#00ff88', '合成信号 s(t) = I·cos(ωt) + Q·sin(ωt)', (t) => iqModulation(I, Q, t), Math.sqrt(2));

    const decodeY = waveTop + (waveH * 2 + waveGap) * 3 + 10;
    const decodeH = 40;
    const decodeIW = waveformW / 2 - 10;
    const decodeQW = waveformW / 2 - 10;

    function drawDecodeWave(
      x: number,
      y: number,
      width: number,
      height: number,
      color: string,
      label: string,
      dcValue: number,
      getValue: (t: number) => number
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

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.beginPath();

      const cycles = 10;
      for (let i = 0; i <= width; i++) {
        const t = (i / width) * cycles * 2 * Math.PI + time * 4;
        const val = getValue(t);
        const py = y - (val) * height * 0.8;
        if (i === 0) ctx.moveTo(x + i, py);
        else ctx.lineTo(x + i, py);
      }
      ctx.stroke();

      const dcY = y - dcValue * height * 0.8;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 3]);
      ctx.beginPath();
      ctx.moveTo(x, dcY);
      ctx.lineTo(x + width, dcY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(label, x + 5, y - height - 5);

      ctx.fillStyle = color;
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.fillText(`直流分量 = ${dcValue.toFixed(3)}`, x + width - 120, y - height - 5);

      ctx.restore();
    }

    const decodeI = (t: number) => iqModulation(I, Q, t) * Math.cos(t) * 2;
    const decodeQ = (t: number) => iqModulation(I, Q, t) * Math.sin(t) * 2;

    drawDecodeWave(waveformX, decodeY, decodeIW, decodeH, '#00d4ff', '× cos(ωt) → 低通 → I', I, decodeI);
    drawDecodeWave(waveformX + decodeIW + 20, decodeY, decodeQW, decodeH, '#a855f7', '× sin(ωt) → 低通 → Q', Q, decodeQ);

    const totalAmp = iqAmplitude(I, Q);
    const totalPhase = iqPhase(I, Q);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText(`幅度: ${totalAmp.toFixed(3)}`, waveformX, outWaveY + waveH + 20);
    ctx.fillText(`相位: ${(totalPhase * 180 / Math.PI).toFixed(1)}°`, waveformX + 110, outWaveY + waveH + 20);
    ctx.fillText(`I = ${I.toFixed(3)}`, waveformX, decodeY + decodeH + 20);
    ctx.fillText(`Q = ${Q.toFixed(3)}`, waveformX + decodeIW + 20, decodeY + decodeH + 20);

    return () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [modulationFormat, iComponent, qComponent, time, symbolIndex]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-xl"
      style={{ display: 'block' }}
    />
  );
}
