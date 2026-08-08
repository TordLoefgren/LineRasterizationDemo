export interface CanvasDisplayMetrics {
  readonly cssWidth: number
  readonly cssHeight: number
  readonly devicePixelRatio: number
}

export function getCanvasDisplayMetrics(
  canvasElement: HTMLCanvasElement
): CanvasDisplayMetrics {
  const width = canvasElement.clientWidth
  const height = canvasElement.clientHeight
  const pixelRatio = window.devicePixelRatio || 1

  return {
    cssWidth: width,
    cssHeight: height,
    devicePixelRatio: pixelRatio
  }
}
