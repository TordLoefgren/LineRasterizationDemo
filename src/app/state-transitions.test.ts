import { describe, expect, it } from "vitest"
import { LineAlgorithm } from "../rasterization/rasterize-line"
import type { AppState } from "./state"
import {
  resizeGrid,
  setDimensionsLinked,
  setEndpoint,
  setEndpointComponent,
  setGridDimension
} from "./state-transitions"
import { Axis, Endpoint, GridDimension } from "../grid/geometry"

describe("application state transitions", () => {
  describe("resizeGrid", () => {
    it("clamps both endpoints when the grid shrinks", () => {
      // Arrange.
      const initialState: AppState = {
        gridDimensions: { columns: 10, rows: 10 },
        lineSegment: {
          coordinateA: { x: 6, y: 7 },
          coordinateB: { x: 8, y: 9 }
        },
        areDimensionsLinked: false,
        lineAlgorithm: LineAlgorithm.Bresenham
      }

      // Act.
      const finalState = resizeGrid(initialState, {
        columns: 4,
        rows: 6
      })

      // Assert.
      expect(finalState.gridDimensions).toEqual({ columns: 4, rows: 6 })
      expect(finalState.lineSegment).toEqual({
        coordinateA: { x: 3, y: 5 },
        coordinateB: { x: 3, y: 5 }
      })
      expect(initialState.gridDimensions).toEqual({ columns: 10, rows: 10 })
    })

    it("preserves endpoints when the grid expands", () => {
      // Arrange.
      const initialState: AppState = {
        gridDimensions: { columns: 5, rows: 5 },
        lineSegment: {
          coordinateA: { x: 1, y: 2 },
          coordinateB: { x: 3, y: 4 }
        },
        areDimensionsLinked: false,
        lineAlgorithm: LineAlgorithm.Bresenham
      }

      // Act.
      const finalState = resizeGrid(initialState, {
        columns: 10,
        rows: 10
      })

      // Assert.
      expect(finalState.gridDimensions).toEqual({ columns: 10, rows: 10 })
      expect(finalState.lineSegment).toEqual({
        coordinateA: { x: 1, y: 2 },
        coordinateB: { x: 3, y: 4 }
      })
      expect(initialState.gridDimensions).toEqual({ columns: 5, rows: 5 })
    })

    it("rejects invalid grid dimensions before constructing new state", () => {
      // Arrange.
      const initialState: AppState = {
        gridDimensions: { columns: 5, rows: 5 },
        lineSegment: {
          coordinateA: { x: 1, y: 2 },
          coordinateB: { x: 3, y: 4 }
        },
        areDimensionsLinked: false,
        lineAlgorithm: LineAlgorithm.Bresenham
      }

      // Act & Assert.
      expect(() => {
        resizeGrid(initialState, {
          columns: 33,
          rows: 0
        })
      }).toThrow("Grid dimensions are invalid")
    })

    it("does not mutate the previous state or its nested values", () => {
      // Arrange.
      const initialState: AppState = {
        gridDimensions: { columns: 5, rows: 5 },
        lineSegment: {
          coordinateA: { x: 1, y: 2 },
          coordinateB: { x: 3, y: 4 }
        },
        areDimensionsLinked: false,
        lineAlgorithm: LineAlgorithm.Bresenham
      }
      const initialStateSnapshot = structuredClone(initialState)

      // Act.
      const finalState = resizeGrid(initialState, {
        columns: 10,
        rows: 10
      })

      // Assert.
      expect(finalState).not.toBe(initialState)
      expect(initialState).toEqual(initialStateSnapshot)
    })
  })

  describe("setGridDimension", () => {
    it("changes only columns or rows when dimensions are not linked", () => {
      // Arrange.
      const initialState: AppState = {
        gridDimensions: { columns: 10, rows: 10 },
        lineSegment: {
          coordinateA: { x: 6, y: 7 },
          coordinateB: { x: 8, y: 9 }
        },
        areDimensionsLinked: false,
        lineAlgorithm: LineAlgorithm.Bresenham
      }

      // Act.
      const finalStateA = setGridDimension(
        initialState,
        GridDimension.Columns,
        5
      )
      const finalStateB = setGridDimension(initialState, GridDimension.Rows, 5)

      // Assert.
      expect(finalStateA.gridDimensions).toEqual({ columns: 5, rows: 10 })
      expect(finalStateB.gridDimensions).toEqual({ columns: 10, rows: 5 })
    })

    it("changes both dimensions when either linked dimension changes", () => {
      // Arrange.
      const initialState: AppState = {
        gridDimensions: { columns: 10, rows: 10 },
        lineSegment: {
          coordinateA: { x: 6, y: 7 },
          coordinateB: { x: 8, y: 9 }
        },
        areDimensionsLinked: true,
        lineAlgorithm: LineAlgorithm.Bresenham
      }

      // Act.
      const finalStateA = setGridDimension(
        initialState,
        GridDimension.Columns,
        5
      )
      const finalStateB = setGridDimension(initialState, GridDimension.Rows, 5)

      // Assert.
      expect(finalStateA.gridDimensions).toEqual({ columns: 5, rows: 5 })
      expect(finalStateB.gridDimensions).toEqual({ columns: 5, rows: 5 })
    })
  })

  describe("setDimensionsLinked", () => {
    it("synchronizes rows to columns when dimension linking is enabled", () => {
      // Arrange.
      const initialState: AppState = {
        gridDimensions: { columns: 5, rows: 9 },
        lineSegment: {
          coordinateA: { x: 1, y: 2 },
          coordinateB: { x: 3, y: 4 }
        },
        areDimensionsLinked: false,
        lineAlgorithm: LineAlgorithm.Bresenham
      }

      // Act.
      const finalState = setDimensionsLinked(initialState, true)

      // Assert.
      expect(finalState.gridDimensions).toEqual({ columns: 5, rows: 5 })
      expect(finalState.areDimensionsLinked).toBe(true)
    })

    it("preserves the current dimensions when dimension linking is disabled", () => {
      // Arrange.
      const initialState: AppState = {
        gridDimensions: { columns: 5, rows: 5 },
        lineSegment: {
          coordinateA: { x: 1, y: 2 },
          coordinateB: { x: 3, y: 4 }
        },
        areDimensionsLinked: true,
        lineAlgorithm: LineAlgorithm.Bresenham
      }

      // Act.
      const finalState = setDimensionsLinked(initialState, false)

      // Assert.
      expect(finalState.gridDimensions).toEqual({ columns: 5, rows: 5 })
      expect(finalState.areDimensionsLinked).toBe(false)
    })
  })

  describe("setEndpoint", () => {
    it("replaces only the selected endpoint", () => {
      // Arrange.
      const initialState: AppState = {
        gridDimensions: { columns: 10, rows: 10 },
        lineSegment: {
          coordinateA: { x: 6, y: 7 },
          coordinateB: { x: 8, y: 9 }
        },
        areDimensionsLinked: true,
        lineAlgorithm: LineAlgorithm.Bresenham
      }

      // Act.
      const finalState = setEndpoint(initialState, Endpoint.A, { x: 5, y: 6 })

      // Assert.
      expect(finalState.lineSegment.coordinateA).toEqual({ x: 5, y: 6 })
      expect(finalState.lineSegment.coordinateB).toEqual({ x: 8, y: 9 })
    })

    it("rejects endpoints outside the current grid", () => {
      // Arrange.
      const initialState: AppState = {
        gridDimensions: { columns: 5, rows: 5 },
        lineSegment: {
          coordinateA: { x: 1, y: 2 },
          coordinateB: { x: 3, y: 4 }
        },
        areDimensionsLinked: false,
        lineAlgorithm: LineAlgorithm.Bresenham
      }

      // Act & Assert.
      expect(() => {
        setEndpoint(initialState, Endpoint.A, { x: 5, y: 3 })
      }).toThrow("The coordinate must be inside the grid")
      expect(() => {
        setEndpoint(initialState, Endpoint.B, { x: 5, y: 3 })
      }).toThrow("The coordinate must be inside the grid")
    })
  })

  describe("setEndpointComponent", () => {
    it("replaces only the selected component of an endpoint", () => {
      // Arrange.
      const initialState: AppState = {
        gridDimensions: { columns: 10, rows: 10 },
        lineSegment: {
          coordinateA: { x: 6, y: 7 },
          coordinateB: { x: 8, y: 9 }
        },
        areDimensionsLinked: true,
        lineAlgorithm: LineAlgorithm.Bresenham
      }

      // Act.
      const finalStateA = setEndpointComponent(
        initialState,
        Endpoint.A,
        Axis.X,
        5
      )
      const finalStateB = setEndpointComponent(
        initialState,
        Endpoint.B,
        Axis.Y,
        5
      )

      // Assert.
      expect(finalStateA.lineSegment.coordinateA).toEqual({ x: 5, y: 7 })
      expect(finalStateB.lineSegment.coordinateB).toEqual({ x: 8, y: 5 })
    })
  })
})
