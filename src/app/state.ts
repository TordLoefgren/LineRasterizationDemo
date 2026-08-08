import type { GridDimensions, GridLineSegment } from "../grid/geometry"
import { LineAlgorithm } from "../rasterization/rasterize-line"

export interface AppState {
  readonly gridDimensions: GridDimensions
  readonly lineSegment: GridLineSegment
  readonly areDimensionsLinked: boolean
  readonly lineAlgorithm: LineAlgorithm
}

export function createDefaultAppState(): AppState {
  return {
    gridDimensions: { columns: 15, rows: 15 },
    lineSegment: {
      coordinateA: { x: 4, y: 10 },
      coordinateB: { x: 10, y: 4 }
    },
    areDimensionsLinked: false,
    lineAlgorithm: LineAlgorithm.Bresenham
  }
}
