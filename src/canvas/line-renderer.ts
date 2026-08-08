import {
  areAdjacent,
  type GridCoordinate,
  type GridLineSegment
} from "../grid/geometry"
import { getCanvasContext } from "./canvas-context"
import type { GridLayout } from "./grid-layout"

const ENDPOINT_LABEL_A = "A"
const ENDPOINT_LABEL_B = "B"
const ENDPOINT_LABEL_AB = "AB"

const RASTERIZED_CELL_COLOR = "limegreen"
const ENDPOINT_COLOR_LIGHT = "green"
const ENDPOINT_COLOR_DARK = "darkgreen"
const ENDPOINT_TEXT_COLOR = "white"
const LINE_COLOR = "black"

const TEXT_ALIGN_CENTER = "center"
const TEXT_BASELINE_MIDDLE = "middle"

const LINE_ALPHA = 0.4
const LINE_WIDTH = 3

function renderCellText(
  canvasContext: CanvasRenderingContext2D,
  text: string,
  offsetX: number,
  offsetY: number,
  cellSize: number
): void {
  const halfCellSize = cellSize / 2

  canvasContext.textAlign = TEXT_ALIGN_CENTER
  canvasContext.textBaseline = TEXT_BASELINE_MIDDLE
  canvasContext.font = `${Math.round(cellSize * 0.6)}px Arial`

  canvasContext.fillText(text, offsetX + halfCellSize, offsetY + halfCellSize)
}

export function renderRasterizedCells(
  canvasElement: HTMLCanvasElement,
  gridLayout: GridLayout,
  rasterizedCells: readonly GridCoordinate[]
): void {
  const canvasContext = getCanvasContext(canvasElement)
  const {
    cellSize: cellSize,
    offsetX: gridOffsetX,
    offsetY: gridOffsetY
  } = gridLayout

  rasterizedCells.forEach((cell) => {
    const offsetX = gridOffsetX + cellSize * cell.x
    const offsetY = gridOffsetY + cellSize * cell.y

    canvasContext.fillStyle = RASTERIZED_CELL_COLOR
    canvasContext.fillRect(offsetX, offsetY, cellSize, cellSize)
  })
}

export function renderLineSegmentEndpoints(
  canvasElement: HTMLCanvasElement,
  lineSegment: GridLineSegment,
  gridLayout: GridLayout
): void {
  const canvasContext = getCanvasContext(canvasElement)
  const {
    cellSize: cellSize,
    offsetX: gridOffsetX,
    offsetY: gridOffsetY
  } = gridLayout

  const { coordinateA, coordinateB } = lineSegment

  if (coordinateA.x === coordinateB.x && coordinateA.y === coordinateB.y) {
    // Draw AB.
    const offsetX = gridOffsetX + cellSize * coordinateA.x
    const offsetY = gridOffsetY + cellSize * coordinateA.y

    canvasContext.fillStyle = ENDPOINT_COLOR_DARK
    canvasContext.fillRect(offsetX, offsetY, cellSize, cellSize)

    canvasContext.fillStyle = ENDPOINT_TEXT_COLOR
    renderCellText(canvasContext, ENDPOINT_LABEL_AB, offsetX, offsetY, cellSize)
  } else {
    const offsetAX = gridOffsetX + cellSize * coordinateA.x
    const offsetAY = gridOffsetY + cellSize * coordinateA.y

    const offsetBX = gridOffsetX + cellSize * coordinateB.x
    const offsetBY = gridOffsetY + cellSize * coordinateB.y

    if (!areAdjacent(coordinateA, coordinateB)) {
      // Draw ideal AB line segment.

      const halfCellSize = cellSize / 2

      canvasContext.save()

      canvasContext.strokeStyle = LINE_COLOR
      canvasContext.globalAlpha = LINE_ALPHA
      canvasContext.lineWidth = LINE_WIDTH

      canvasContext.beginPath()

      canvasContext.moveTo(offsetAX + halfCellSize, offsetAY + halfCellSize)
      canvasContext.lineTo(offsetBX + halfCellSize, offsetBY + halfCellSize)

      canvasContext.stroke()

      canvasContext.restore()
    }

    // Draw A.
    canvasContext.fillStyle = ENDPOINT_COLOR_LIGHT
    canvasContext.fillRect(offsetAX, offsetAY, cellSize, cellSize)

    canvasContext.fillStyle = ENDPOINT_TEXT_COLOR
    renderCellText(
      canvasContext,
      ENDPOINT_LABEL_A,
      offsetAX,
      offsetAY,
      cellSize
    )

    // Draw B.
    canvasContext.fillStyle = ENDPOINT_COLOR_LIGHT
    canvasContext.fillRect(offsetBX, offsetBY, cellSize, cellSize)

    canvasContext.fillStyle = ENDPOINT_TEXT_COLOR
    renderCellText(
      canvasContext,
      ENDPOINT_LABEL_B,
      offsetBX,
      offsetBY,
      cellSize
    )
  }
}
