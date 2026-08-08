import type { CanvasDisplayMetrics } from "./canvas-metrics"

export function getCanvasContext(
  canvasElement: HTMLCanvasElement
): CanvasRenderingContext2D {
  const canvasContext = canvasElement.getContext("2d")
  if (!canvasContext) {
    throw new Error("Canvas context was unavailable")
  }

  return canvasContext
}

export function clearCanvas(
  canvasElement: HTMLCanvasElement,
  canvasMetrics: CanvasDisplayMetrics
): void {
  const canvasContext = getCanvasContext(canvasElement)
  const {
    cssWidth: canvasWidth,
    cssHeight: canvasHeight,
    devicePixelRatio
  } = canvasMetrics

  canvasContext.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
}

export function resizeCanvasBuffer(
  canvasElement: HTMLCanvasElement,
  canvasMetrics: CanvasDisplayMetrics
): void {
  const {
    cssWidth: canvasWidth,
    cssHeight: canvasHeight,
    devicePixelRatio
  } = canvasMetrics
  if (canvasWidth <= 0 || canvasHeight <= 0) {
    throw new Error("Canvas dimensions must be greater than zero")
  }

  const bufferWidth = Math.round(canvasWidth * devicePixelRatio)
  const bufferHeight = Math.round(canvasHeight * devicePixelRatio)

  if (
    canvasElement.width !== bufferWidth ||
    canvasElement.height !== bufferHeight
  ) {
    canvasElement.width = bufferWidth
    canvasElement.height = bufferHeight
  }
}
