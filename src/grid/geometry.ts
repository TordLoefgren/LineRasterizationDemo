export const MIN_GRID_SIZE = 1
export const MAX_GRID_SIZE = 32

export const Axis = {
  X: "x",
  Y: "y"
} as const

export type Axis = (typeof Axis)[keyof typeof Axis]

export const Endpoint = {
  A: "a",
  B: "b"
} as const

export type Endpoint = (typeof Endpoint)[keyof typeof Endpoint]

export const GridDimension = {
  Columns: "columns",
  Rows: "rows"
} as const

export type GridDimension = (typeof GridDimension)[keyof typeof GridDimension]

export interface GridCoordinate {
  readonly x: number
  readonly y: number
}

export function getEndpointCoordinateKey(
  endpoint: Endpoint
): "coordinateA" | "coordinateB" {
  if (endpoint === Endpoint.A) {
    return "coordinateA"
  }

  return "coordinateB"
}

export interface GridLineSegment {
  readonly coordinateA: GridCoordinate
  readonly coordinateB: GridCoordinate
}

export interface GridDimensions {
  readonly columns: number
  readonly rows: number
}

export function areAdjacent(
  coordinateA: GridCoordinate,
  coordinateB: GridCoordinate
): boolean {
  const deltaX = Math.abs(coordinateB.x - coordinateA.x)
  const deltaY = Math.abs(coordinateB.y - coordinateA.y)

  return Math.max(deltaX, deltaY) === 1
}

export function isCoordinateInsideGrid(
  gridCoordinate: GridCoordinate,
  gridDimensions: GridDimensions
): boolean {
  return (
    Number.isInteger(gridCoordinate.x) &&
    Number.isInteger(gridCoordinate.y) &&
    gridCoordinate.x >= 0 &&
    gridCoordinate.x < gridDimensions.columns &&
    gridCoordinate.y >= 0 &&
    gridCoordinate.y < gridDimensions.rows
  )
}

export function assertValidGridDimensions(
  gridDimensions: GridDimensions
): void {
  if (
    !Number.isInteger(gridDimensions.columns) ||
    !Number.isInteger(gridDimensions.rows) ||
    gridDimensions.columns < MIN_GRID_SIZE ||
    gridDimensions.columns > MAX_GRID_SIZE ||
    gridDimensions.rows < MIN_GRID_SIZE ||
    gridDimensions.rows > MAX_GRID_SIZE
  ) {
    throw new Error("Grid dimensions are invalid")
  }
}
