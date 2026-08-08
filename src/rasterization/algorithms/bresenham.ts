import type { GridCoordinate, GridLineSegment } from "../../grid/geometry"

/**
 * All-octants variant adapted from Figure 3 of David J. Stahl Jr.,
 * "A Lab Exercise for Rasterizing Lines" (CGEMS, 2008).
 */
export function bresenham(
  lineSegment: GridLineSegment
): readonly GridCoordinate[] {
  const { coordinateA, coordinateB } = lineSegment

  let x1 = coordinateA.x
  let y1 = coordinateA.y
  let x2 = coordinateB.x
  let y2 = coordinateB.y

  // Line 1.
  const steep = Math.abs(y2 - y1) > Math.abs(x2 - x1)

  // Lines 2-4.
  if (steep) {
    ;[x1, y1] = [y1, x1]
    ;[x2, y2] = [y2, x2]
  }

  // Lines 4a-4c.
  let endpointsWereSwapped = false

  if (x1 > x2) {
    ;[x1, x2] = [x2, x1]
    ;[y1, y2] = [y2, y1]

    endpointsWereSwapped = true
  }

  // Lines 5-9a.
  const dx = x2 - x1
  const dy = Math.abs(y2 - y1)

  let error = 0
  const errorIncrement = dy

  let y = y1
  const yStep = y1 < y2 ? 1 : -1

  const rasterizedCells: GridCoordinate[] = []

  // Lines 10-15.
  for (let x = x1; x <= x2; x++) {
    rasterizedCells.push(steep ? { x: y, y: x } : { x, y })

    error += errorIncrement

    if (2 * error >= dx) {
      y += yStep
      error -= dx
    }
  }

  // We are interested in an ordered path, so we restore A -> B traversal order.
  if (endpointsWereSwapped) {
    rasterizedCells.reverse()
  }

  return rasterizedCells
}
