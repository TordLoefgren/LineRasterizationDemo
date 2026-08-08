import {
  assertValidGridDimensions,
  Axis,
  Endpoint,
  getEndpointCoordinateKey,
  GridDimension,
  isCoordinateInsideGrid,
  type GridCoordinate,
  type GridDimensions
} from "../grid/geometry"
import type { LineAlgorithm } from "../rasterization/rasterize-line"
import type { AppState } from "./state"

export function resizeGrid(
  appState: AppState,
  gridDimensions: GridDimensions
): AppState {
  assertValidGridDimensions(gridDimensions)

  // The resized grid must always contain both endpoints
  const coordinateA: GridCoordinate = {
    x:
      appState.lineSegment.coordinateA.x >= gridDimensions.columns
        ? gridDimensions.columns - 1
        : appState.lineSegment.coordinateA.x,
    y:
      appState.lineSegment.coordinateA.y >= gridDimensions.rows
        ? gridDimensions.rows - 1
        : appState.lineSegment.coordinateA.y
  }

  const coordinateB: GridCoordinate = {
    x:
      appState.lineSegment.coordinateB.x >= gridDimensions.columns
        ? gridDimensions.columns - 1
        : appState.lineSegment.coordinateB.x,
    y:
      appState.lineSegment.coordinateB.y >= gridDimensions.rows
        ? gridDimensions.rows - 1
        : appState.lineSegment.coordinateB.y
  }

  return {
    ...appState,
    gridDimensions: gridDimensions,
    lineSegment: { coordinateA: coordinateA, coordinateB: coordinateB }
  }
}

export function setEndpoint(
  appState: AppState,
  endpoint: Endpoint,
  gridCoordinate: GridCoordinate
): AppState {
  if (!isCoordinateInsideGrid(gridCoordinate, appState.gridDimensions)) {
    throw new Error("The coordinate must be inside the grid")
  }

  return {
    ...appState,
    lineSegment: {
      ...appState.lineSegment,
      [getEndpointCoordinateKey(endpoint)]: gridCoordinate
    }
  }
}

export function setEndpointComponent(
  appState: AppState,
  endpoint: Endpoint,
  axis: Axis,
  value: number
): AppState {
  const coordinateKey = getEndpointCoordinateKey(endpoint)
  const gridCoordinate = {
    ...appState.lineSegment[coordinateKey],
    [axis]: value
  }

  return setEndpoint(appState, endpoint, gridCoordinate)
}

export function setGridDimension(
  appState: AppState,
  dimension: GridDimension,
  value: number
): AppState {
  const dimensions = appState.areDimensionsLinked
    ? { columns: value, rows: value }
    : {
        ...appState.gridDimensions,
        [dimension]: value
      }

  return resizeGrid(appState, dimensions)
}

export function setDimensionsLinked(
  appState: AppState,
  areDimensionsLinked: boolean
): AppState {
  if (!areDimensionsLinked) {
    return {
      ...appState,
      areDimensionsLinked: false
    }
  }

  // When dimensions are linked, the rows will be set to the columns value
  const linkedState = {
    ...appState,
    areDimensionsLinked: true
  }
  const columns = appState.gridDimensions.columns

  return resizeGrid(linkedState, { columns: columns, rows: columns })
}

export function setLineAlgorithm(
  appState: AppState,
  lineAlgorithm: LineAlgorithm
): AppState {
  return {
    ...appState,
    lineAlgorithm: lineAlgorithm
  }
}
