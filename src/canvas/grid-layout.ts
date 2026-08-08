import type { GridDimensions } from "../grid/geometry"
import type { CanvasDisplayMetrics } from "./canvas-metrics"

export interface GridLayout {
  readonly cellSize: number
  readonly width: number
  readonly height: number
  readonly offsetX: number
  readonly offsetY: number
}

export function calculateGridLayout(
  canvasMetrics: CanvasDisplayMetrics,
  grid: GridDimensions
): GridLayout {
  const columns = grid.columns
  const rows = grid.rows
  const cellSize = Math.min(
    canvasMetrics.cssWidth / columns,
    canvasMetrics.cssHeight / rows
  )

  const gridWidth = columns * cellSize
  const gridHeight = rows * cellSize

  const gridOffsetX = (canvasMetrics.cssWidth - gridWidth) / 2
  const gridOffsetY = (canvasMetrics.cssHeight - gridHeight) / 2

  return {
    cellSize: cellSize,
    width: gridWidth,
    height: gridHeight,
    offsetX: gridOffsetX,
    offsetY: gridOffsetY
  }
}
