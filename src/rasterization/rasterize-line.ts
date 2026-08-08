import type { GridCoordinate, GridLineSegment } from "../grid/geometry"
import { bresenham } from "./algorithms/bresenham"

export const LineAlgorithm = {
  Bresenham: "bresenham"
} as const

export type LineAlgorithm = (typeof LineAlgorithm)[keyof typeof LineAlgorithm]

export function lineAlgorithmToDisplay(lineAlgorithm: LineAlgorithm): string {
  if (lineAlgorithm === LineAlgorithm.Bresenham) {
    return "Bresenham"
  }

  throw new Error(`Unknown type for LineAlgorithm: ${lineAlgorithm}`)
}

export function isLineAlgorithm(value: string): value is LineAlgorithm {
  return Object.values(LineAlgorithm).some((algorithm) => algorithm === value)
}

export function rasterizeLine(
  lineAlgorithm: LineAlgorithm,
  lineSegment: GridLineSegment
): readonly GridCoordinate[] {
  if (lineAlgorithm === LineAlgorithm.Bresenham) {
    return bresenham(lineSegment)
  }

  throw new Error(`Unknown type for LineAlgorithm: ${lineAlgorithm}`)
}
