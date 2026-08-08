import { clearCanvas, resizeCanvasBuffer } from "../canvas/canvas-context"
import { getCanvasDisplayMetrics } from "../canvas/canvas-metrics"
import { tryGetGridCoordinate } from "../canvas/grid-hit-testing"
import { calculateGridLayout } from "../canvas/grid-layout"
import { renderGrid } from "../canvas/grid-renderer"
import {
  renderLineSegmentEndpoints,
  renderRasterizedCells
} from "../canvas/line-renderer"
import { Axis, Endpoint, GridDimension } from "../grid/geometry"
import { isLineAlgorithm, rasterizeLine } from "../rasterization/rasterize-line"
import type { AppElements } from "../ui/elements"
import { renderControls } from "../ui/render-controls"
import { renderFooter } from "../ui/render-footer"
import { renderSummary, renderSummaryFailure } from "../ui/render-summary"
import { createDefaultAppState, type AppState } from "./state"
import {
  setDimensionsLinked,
  setEndpoint,
  setEndpointComponent,
  setGridDimension,
  setLineAlgorithm
} from "./state-transitions"

const EVENT_TYPE_CHANGE = "change"
const EVENT_TYPE_CLICK = "click"
const EVENT_TYPE_INPUT = "input"
const EVENT_TYPE_RESIZE = "resize"

function renderApp(appElements: AppElements, appState: AppState): void {
  appElements.previewError.hidden = true
  appElements.previewError.textContent = ""

  const canvasMetrics = getCanvasDisplayMetrics(appElements.canvas)
  const gridLayout = calculateGridLayout(canvasMetrics, appState.gridDimensions)

  renderControls(appElements, appState)
  renderFooter(appElements, appState)

  resizeCanvasBuffer(appElements.canvas, canvasMetrics)
  clearCanvas(appElements.canvas, canvasMetrics)
  renderGrid(appElements.canvas, appState.gridDimensions, gridLayout)

  try {
    const rasterizedCells = rasterizeLine(
      appState.lineAlgorithm,
      appState.lineSegment
    )

    renderSummary(appElements, appState, rasterizedCells.length)

    renderRasterizedCells(appElements.canvas, gridLayout, rasterizedCells)
    renderLineSegmentEndpoints(
      appElements.canvas,
      appState.lineSegment,
      gridLayout
    )
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred"

    renderSummaryFailure(appElements, appState)

    appElements.previewError.hidden = false
    appElements.previewError.textContent = errorMessage

    console.error(error)
  }
}

export function startApp(appElements: AppElements): void {
  let appState = createDefaultAppState()

  // Define convenience closures.
  function render(): void {
    renderApp(appElements, appState)
  }

  function setNextStateAndRender(nextState: AppState): void {
    appState = nextState
    render()
  }

  // Register event listeners.
  appElements.canvas.addEventListener(EVENT_TYPE_CLICK, (event) => {
    const coordinate = tryGetGridCoordinate(
      calculateGridLayout(
        getCanvasDisplayMetrics(appElements.canvas),
        appState.gridDimensions
      ),
      event.offsetX,
      event.offsetY
    )
    if (coordinate) {
      setNextStateAndRender(
        setEndpoint(
          appState,
          event.shiftKey ? Endpoint.B : Endpoint.A,
          coordinate
        )
      )
    }
  })

  appElements.columnsInput.addEventListener(EVENT_TYPE_INPUT, () => {
    setNextStateAndRender(
      setGridDimension(
        appState,
        GridDimension.Columns,
        appElements.columnsInput.valueAsNumber
      )
    )
  })

  appElements.rowsInput.addEventListener(EVENT_TYPE_INPUT, () => {
    setNextStateAndRender(
      setGridDimension(
        appState,
        GridDimension.Rows,
        appElements.rowsInput.valueAsNumber
      )
    )
  })

  appElements.linkColumnsAndRowsInput.addEventListener(
    EVENT_TYPE_CHANGE,
    () => {
      setNextStateAndRender(
        setDimensionsLinked(
          appState,
          appElements.linkColumnsAndRowsInput.checked
        )
      )
    }
  )

  appElements.algorithmInput.addEventListener(EVENT_TYPE_CHANGE, () => {
    const lineAlgorithm = appElements.algorithmInput.value
    if (!isLineAlgorithm(lineAlgorithm)) {
      throw new Error(`Unknown type for LineAlgorithm: ${lineAlgorithm}`)
    }
    setNextStateAndRender(setLineAlgorithm(appState, lineAlgorithm))
  })

  appElements.coordinateAXInput.addEventListener(EVENT_TYPE_INPUT, () => {
    setNextStateAndRender(
      setEndpointComponent(
        appState,
        Endpoint.A,
        Axis.X,
        appElements.coordinateAXInput.valueAsNumber
      )
    )
  })

  appElements.coordinateAYInput.addEventListener(EVENT_TYPE_INPUT, () => {
    setNextStateAndRender(
      setEndpointComponent(
        appState,
        Endpoint.A,
        Axis.Y,
        appElements.coordinateAYInput.valueAsNumber
      )
    )
  })

  appElements.coordinateBXInput.addEventListener(EVENT_TYPE_INPUT, () => {
    setNextStateAndRender(
      setEndpointComponent(
        appState,
        Endpoint.B,
        Axis.X,
        appElements.coordinateBXInput.valueAsNumber
      )
    )
  })

  appElements.coordinateBYInput.addEventListener(EVENT_TYPE_INPUT, () => {
    setNextStateAndRender(
      setEndpointComponent(
        appState,
        Endpoint.B,
        Axis.Y,
        appElements.coordinateBYInput.valueAsNumber
      )
    )
  })

  window.addEventListener(EVENT_TYPE_RESIZE, render)

  render()
}
