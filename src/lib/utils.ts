import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setupCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): { width: number; height: number } | null {
  const rect = canvas.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  const W = rect.width
  const H = rect.height
  if (W === 0 || H === 0) return null
  canvas.width = W * dpr
  canvas.height = H * dpr
  ctx.scale(dpr, dpr)
  return { width: W, height: H }
}

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  step: number = 30,
  color: string = 'rgba(51, 65, 85, 0.2)'
) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  for (let x = 0; x < W; x += step) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, H)
    ctx.stroke()
  }
  for (let y = 0; y < H; y += step) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(W, y)
    ctx.stroke()
  }
  ctx.restore()
}
