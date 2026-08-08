import { describe, expect, it } from "vitest"
import {
  assertValidGridDimensions,
  isCoordinateInsideGrid,
  MAX_GRID_SIZE,
  MIN_GRID_SIZE,
  type GridDimensions
} from "./geometry"

describe("grid geometry", () => {
  describe("isCoordinateInsideGrid", () => {
    it("returns true for an integer coordinate inside the grid", () => {
      // Arrange.
      const gridDimensions = { columns: 10, rows: 10 }
      const coordinate = { x: 4, y: 7 }

      // Act.
      const isInsideGrid = isCoordinateInsideGrid(coordinate, gridDimensions)

      // Assert.
      expect(isInsideGrid).toBe(true)
    })

    it("accepts the top-left coordinate (0, 0)", () => {
      // Arrange.
      const gridDimensions = { columns: 10, rows: 10 }
      const coordinate = { x: 0, y: 0 }

      // Act.
      const isInsideGrid = isCoordinateInsideGrid(coordinate, gridDimensions)

      // Assert.
      expect(isInsideGrid).toBe(true)
    })

    it("accepts the bottom-right coordinate (columns - 1, rows - 1)", () => {
      // Arrange.
      const gridDimensions = { columns: 10, rows: 10 }
      const coordinate = {
        x: gridDimensions.columns - 1,
        y: gridDimensions.rows - 1
      }

      // Act.
      const isInsideGrid = isCoordinateInsideGrid(coordinate, gridDimensions)

      // Assert.
      expect(isInsideGrid).toBe(true)
    })

    it("rejects coordinates on or beyond the right and bottom boundaries", () => {
      // Arrange.
      const gridDimensions = { columns: 10, rows: 10 }

      // Act.
      const isOnRightBoundary = isCoordinateInsideGrid(
        {
          x: gridDimensions.columns,
          y: gridDimensions.rows - 1
        },
        gridDimensions
      )
      const isBeyondRightBoundary = isCoordinateInsideGrid(
        {
          x: gridDimensions.columns + 1,
          y: gridDimensions.rows - 1
        },
        gridDimensions
      )
      const isOnBottomBoundary = isCoordinateInsideGrid(
        {
          x: gridDimensions.columns - 1,
          y: gridDimensions.rows
        },
        gridDimensions
      )
      const isBeyondBottomBoundary = isCoordinateInsideGrid(
        {
          x: gridDimensions.columns - 1,
          y: gridDimensions.rows + 1
        },
        gridDimensions
      )

      // Assert.
      expect(isOnRightBoundary).toBe(false)
      expect(isBeyondRightBoundary).toBe(false)
      expect(isOnBottomBoundary).toBe(false)
      expect(isBeyondBottomBoundary).toBe(false)
    })

    it("rejects negative coordinates", () => {
      // Arrange.
      const gridDimensions = { columns: 10, rows: 10 }

      // Act.
      const isInsideGridA = isCoordinateInsideGrid(
        {
          x: -1,
          y: gridDimensions.rows - 1
        },
        gridDimensions
      )
      const isInsideGridB = isCoordinateInsideGrid(
        {
          x: gridDimensions.columns - 1,
          y: -1
        },
        gridDimensions
      )

      // Assert.
      expect(isInsideGridA).toBe(false)
      expect(isInsideGridB).toBe(false)
    })

    it("rejects fractional coordinates", () => {
      // Arrange.
      const gridDimensions = { columns: 10, rows: 10 }

      // Act.
      const isInsideGridA = isCoordinateInsideGrid(
        {
          x: 0.5,
          y: gridDimensions.rows - 1
        },
        gridDimensions
      )
      const isInsideGridB = isCoordinateInsideGrid(
        {
          x: gridDimensions.columns - 1,
          y: 0.5
        },
        gridDimensions
      )

      // Assert.
      expect(isInsideGridA).toBe(false)
      expect(isInsideGridB).toBe(false)
    })
  })

  describe("assertValidGridDimensions", () => {
    it("validates the minimum supported grid dimensions", () => {
      // Arrange.
      const gridDimensionsA = { columns: MIN_GRID_SIZE, rows: 10 }
      const gridDimensionsB = { columns: 10, rows: MIN_GRID_SIZE }

      // Act & Assert.
      expect(() => {
        assertValidGridDimensions(gridDimensionsA)
      }).not.toThrow()
      expect(() => {
        assertValidGridDimensions(gridDimensionsB)
      }).not.toThrow()
    })

    it("validates the maximum supported grid dimensions", () => {
      // Arrange.
      const gridDimensionsA = { columns: MAX_GRID_SIZE, rows: 10 }
      const gridDimensionsB = { columns: 10, rows: MAX_GRID_SIZE }

      // Act & Assert.
      expect(() => {
        assertValidGridDimensions(gridDimensionsA)
      }).not.toThrow()
      expect(() => {
        assertValidGridDimensions(gridDimensionsB)
      }).not.toThrow()
    })

    it("rejects zero, negative, fractional, NaN, and oversized dimensions", () => {
      // Arrange.
      function expectInvalidGridDimensions(
        gridDimensions: GridDimensions
      ): void {
        expect(() => {
          assertValidGridDimensions(gridDimensions)
        }).toThrow("Grid dimensions are invalid")
      }

      // Act & Assert.
      expectInvalidGridDimensions({ columns: 0, rows: 10 })
      expectInvalidGridDimensions({ columns: 10, rows: 0 })

      expectInvalidGridDimensions({ columns: -10, rows: 10 })
      expectInvalidGridDimensions({ columns: 10, rows: -10 })

      expectInvalidGridDimensions({ columns: 0.5, rows: 10 })
      expectInvalidGridDimensions({ columns: 10, rows: 0.5 })

      expectInvalidGridDimensions({ columns: NaN, rows: 10 })
      expectInvalidGridDimensions({ columns: 10, rows: NaN })

      expectInvalidGridDimensions({ columns: MAX_GRID_SIZE + 1, rows: 10 })
      expectInvalidGridDimensions({ columns: MIN_GRID_SIZE - 1, rows: 10 })

      expectInvalidGridDimensions({ columns: 10, rows: MAX_GRID_SIZE + 1 })
      expectInvalidGridDimensions({ columns: 10, rows: MIN_GRID_SIZE - 1 })
    })
  })
})
