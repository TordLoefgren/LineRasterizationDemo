import type { GridDimensions } from "../grid/geometry"
import { getCanvasContext } from "./canvas-context"
import type { GridLayout } from "./grid-layout"

const GRID_COLOR_LIGHT = "#D9D9E0" // slate-6
const GRID_COLOR_DARK = "#B9BBC6" // slate-8

export function renderGrid(
  canvasElement: HTMLCanvasElement,
  gridDimensions: GridDimensions,
  gridLayout: GridLayout
): void {
  const canvasContext = getCanvasContext(canvasElement)
  const {
    cellSize: cellSize,
    offsetX: gridOffsetX,
    offsetY: gridOffsetY
  } = gridLayout

  for (let y = 0; y < gridDimensions.rows; y++) {
    for (let x = 0; x < gridDimensions.columns; x++) {
      canvasContext.fillStyle =
        (x + y) % 2 === 0 ? GRID_COLOR_LIGHT : GRID_COLOR_DARK
      canvasContext.fillRect(
        gridOffsetX + cellSize * x,
        gridOffsetY + cellSize * y,
        cellSize,
        cellSize
      )
    }
  }
}
