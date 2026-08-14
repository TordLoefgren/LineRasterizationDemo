import type { AppState } from "../app/state"
import { clearCanvas, resizeCanvasBuffer } from "../canvas/canvas-context"
import { getCanvasDisplayMetrics } from "../canvas/canvas-metrics"
import { calculateGridLayout } from "../canvas/grid-layout"
import { renderGrid } from "../canvas/grid-renderer"
import {
  renderLineSegmentEndpoints,
  renderRasterizedCells
} from "../canvas/line-renderer"
import { rasterizeLine } from "../rasterization/rasterize-line"
import type { DemoElements } from "../ui/elements"
import { renderControls } from "../ui/render-controls"
import { renderSummary, renderSummaryFailure } from "../ui/render-summary"

export type DemoView = { kind: "demo"; elements: DemoElements }

export function renderDemoView(view: DemoView, state: AppState): void {
  const elements = view.elements

  elements.previewError.hidden = true
  elements.previewError.textContent = ""

  const canvasMetrics = getCanvasDisplayMetrics(elements.canvas)
  const gridLayout = calculateGridLayout(canvasMetrics, state.gridDimensions)

  renderControls(elements, state)

  resizeCanvasBuffer(elements.canvas, canvasMetrics)
  clearCanvas(elements.canvas, canvasMetrics)
  renderGrid(elements.canvas, state.gridDimensions, gridLayout)

  try {
    const rasterizedCells = rasterizeLine(
      state.lineAlgorithm,
      state.lineSegment
    )

    renderSummary(elements, state, rasterizedCells.length)

    renderRasterizedCells(elements.canvas, gridLayout, rasterizedCells)
    renderLineSegmentEndpoints(elements.canvas, state.lineSegment, gridLayout)
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred"

    renderSummaryFailure(elements, state)

    elements.previewError.hidden = false
    elements.previewError.textContent = errorMessage

    console.error(error)
  }
}
