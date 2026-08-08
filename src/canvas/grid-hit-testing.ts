import type { GridCoordinate } from "../grid/geometry"
import type { GridLayout } from "./grid-layout"

export function tryGetGridCoordinate(
  gridLayout: GridLayout,
  pointerOffsetX: number,
  pointerOffsetY: number
): GridCoordinate | null {
  if (
    pointerOffsetX > gridLayout.offsetX &&
    pointerOffsetX < gridLayout.width + gridLayout.offsetX &&
    pointerOffsetY > gridLayout.offsetY &&
    pointerOffsetY < gridLayout.height + gridLayout.offsetY
  ) {
    return {
      x: Math.floor(
        (pointerOffsetX - gridLayout.offsetX) / gridLayout.cellSize
      ),
      y: Math.floor((pointerOffsetY - gridLayout.offsetY) / gridLayout.cellSize)
    }
  }

  return null
}
