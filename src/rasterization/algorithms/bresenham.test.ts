import { describe, expect, it } from "vitest"
import { bresenham } from "./bresenham"

describe("bresenham", () => {
  it("rasterizes a horizontal line from left to right", () => {
    // Arrange.
    const lineSegment = {
      coordinateA: { x: 0, y: 2 },
      coordinateB: { x: 4, y: 2 }
    }

    // Act.
    const rasterizedCells = bresenham(lineSegment)

    // Assert.
    expect(rasterizedCells).toEqual([
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 }
    ])
  })

  it("rasterizes a line containing a single cell", () => {
    // Arrange.
    const lineSegment = {
      coordinateA: { x: 0, y: 2 },
      coordinateB: { x: 0, y: 2 }
    }

    // Act.
    const rasterizedCells = bresenham(lineSegment)

    // Assert.
    expect(rasterizedCells).toEqual([{ x: 0, y: 2 }])
  })

  it("rasterizes a horizontal line from right to left", () => {
    // Arrange.
    const lineSegment = {
      coordinateA: { x: 4, y: 2 },
      coordinateB: { x: 0, y: 2 }
    }

    // Act.
    const rasterizedCells = bresenham(lineSegment)

    // Assert.
    expect(rasterizedCells).toEqual([
      { x: 4, y: 2 },
      { x: 3, y: 2 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 }
    ])
  })

  it("rasterizes a vertical line from top to bottom", () => {
    // Arrange.
    const lineSegment = {
      coordinateA: { x: 2, y: 0 },
      coordinateB: { x: 2, y: 4 }
    }

    // Act.
    const rasterizedCells = bresenham(lineSegment)

    // Assert.
    expect(rasterizedCells).toEqual([
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 2, y: 4 }
    ])
  })

  it("rasterizes a vertical line from bottom to top", () => {
    // Arrange.
    const lineSegment = {
      coordinateA: { x: 2, y: 4 },
      coordinateB: { x: 2, y: 0 }
    }

    // Act.
    const rasterizedCells = bresenham(lineSegment)

    // Assert.
    expect(rasterizedCells).toEqual([
      { x: 2, y: 4 },
      { x: 2, y: 3 },
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 0 }
    ])
  })

  it("rasterizes positive and negative diagonal lines", () => {
    // Arrange.
    const lineSegmentA = {
      coordinateA: { x: 0, y: 0 },
      coordinateB: { x: 4, y: 4 }
    }

    const lineSegmentB = {
      coordinateA: { x: 4, y: 4 },
      coordinateB: { x: 0, y: 0 }
    }

    const lineSegmentC = {
      coordinateA: { x: 4, y: 0 },
      coordinateB: { x: 0, y: 4 }
    }

    const lineSegmentD = {
      coordinateA: { x: 0, y: 4 },
      coordinateB: { x: 4, y: 0 }
    }

    // Act.
    const rasterizedCellsA = bresenham(lineSegmentA)
    const rasterizedCellsB = bresenham(lineSegmentB)
    const rasterizedCellsC = bresenham(lineSegmentC)
    const rasterizedCellsD = bresenham(lineSegmentD)

    // Assert.
    expect(rasterizedCellsA).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 }
    ])
    expect(rasterizedCellsB).toEqual([
      { x: 4, y: 4 },
      { x: 3, y: 3 },
      { x: 2, y: 2 },
      { x: 1, y: 1 },
      { x: 0, y: 0 }
    ])
    expect(rasterizedCellsC).toEqual([
      { x: 4, y: 0 },
      { x: 3, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 3 },
      { x: 0, y: 4 }
    ])
    expect(rasterizedCellsD).toEqual([
      { x: 0, y: 4 },
      { x: 1, y: 3 },
      { x: 2, y: 2 },
      { x: 3, y: 1 },
      { x: 4, y: 0 }
    ])
  })

  it("rasterizes shallow positive and negative slopes", () => {
    // Arrange.
    const lineSegmentA = {
      coordinateA: { x: 0, y: 4 },
      coordinateB: { x: 4, y: 3 }
    }

    const lineSegmentB = {
      coordinateA: { x: 0, y: 0 },
      coordinateB: { x: 4, y: 1 }
    }

    // Act.
    const rasterizedCellsA = bresenham(lineSegmentA)
    const rasterizedCellsB = bresenham(lineSegmentB)

    // Assert.
    expect(rasterizedCellsA).toEqual([
      { x: 0, y: 4 },
      { x: 1, y: 4 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 4, y: 3 }
    ])
    expect(rasterizedCellsB).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 }
    ])
  })

  it("rasterizes steep positive and negative slopes", () => {
    // Arrange.
    const lineSegmentA = {
      coordinateA: { x: 0, y: 4 },
      coordinateB: { x: 2, y: 0 }
    }

    const lineSegmentB = {
      coordinateA: { x: 0, y: 0 },
      coordinateB: { x: 2, y: 4 }
    }

    // Act.
    const rasterizedCellsA = bresenham(lineSegmentA)
    const rasterizedCellsB = bresenham(lineSegmentB)

    // Assert.
    expect(rasterizedCellsA).toEqual([
      { x: 0, y: 4 },
      { x: 0, y: 3 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 0 }
    ])
    expect(rasterizedCellsB).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 2, y: 4 }
    ])
  })

  it("returns cells in coordinate A to coordinate B order", () => {
    // Arrange.
    const lineSegment = {
      coordinateA: { x: 0, y: 4 },
      coordinateB: { x: 2, y: 0 }
    }

    // Act.
    const rasterizedCells = bresenham(lineSegment)

    // Assert.
    expect(rasterizedCells.at(0)).toEqual(lineSegment.coordinateA)
    expect(rasterizedCells.at(-1)).toEqual(lineSegment.coordinateB)
  })

  it("produces only adjacent cells and no duplicates", () => {
    // Arrange.
    const lineSegment = {
      coordinateA: { x: 1, y: 1 },
      coordinateB: { x: 4, y: 8 }
    }

    // Act.
    const rasterizedCells = bresenham(lineSegment)

    // Assert.
    for (let index = 1; index < rasterizedCells.length; index++) {
      const previousCell = rasterizedCells[index - 1]
      const currentCell = rasterizedCells[index]

      const deltaX = Math.abs(currentCell.x - previousCell.x)
      const deltaY = Math.abs(currentCell.y - previousCell.y)

      expect(Math.max(deltaX, deltaY)).toBe(1)
    }

    for (let indexA = 0; indexA < rasterizedCells.length; indexA++) {
      for (let indexB = indexA + 1; indexB < rasterizedCells.length; indexB++) {
        expect(rasterizedCells[indexA]).not.toEqual(rasterizedCells[indexB])
      }
    }
  })
})
