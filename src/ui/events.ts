import type { AppState, GetStateFn, SetStateFn } from "../app/state"
import {
  setDimensionsLinked,
  setEndpoint,
  setEndpointComponent,
  setGridDimension,
  setLineAlgorithm
} from "../app/state-transitions"
import { getCanvasDisplayMetrics } from "../canvas/canvas-metrics"
import { tryGetGridCoordinate } from "../canvas/grid-hit-testing"
import { calculateGridLayout } from "../canvas/grid-layout"
import { Axis, Endpoint, GridDimension } from "../grid/geometry"
import { isLineAlgorithm } from "../rasterization/rasterize-line"
import { renderDemoView, type DemoView } from "../views/demo-view"

export const EVENT_TYPE_CHANGE = "change"
export const EVENT_TYPE_CLICK = "click"
export const EVENT_TYPE_INPUT = "input"
export const EVENT_TYPE_POPSTATE = "popstate"
export const EVENT_TYPE_RESIZE = "resize"

export function registerDemoEventListeners(
  view: DemoView,
  getStateFn: GetStateFn,
  setStateFn: SetStateFn
): void {
  const elements = view.elements

  // Define convenience closures.
  function render(): void {
    renderDemoView(view, getStateFn())
  }

  function setNextStateAndRender(nextState: AppState): void {
    setStateFn(nextState)
    render()
  }

  // Register event listeners.
  elements.canvas.addEventListener(EVENT_TYPE_CLICK, (event) => {
    const coordinate = tryGetGridCoordinate(
      calculateGridLayout(
        getCanvasDisplayMetrics(elements.canvas),
        getStateFn().gridDimensions
      ),
      event.offsetX,
      event.offsetY
    )
    if (coordinate) {
      setNextStateAndRender(
        setEndpoint(
          getStateFn(),
          event.shiftKey ? Endpoint.B : Endpoint.A,
          coordinate
        )
      )
    }
  })

  elements.columnsInput.addEventListener(EVENT_TYPE_INPUT, () => {
    setNextStateAndRender(
      setGridDimension(
        getStateFn(),
        GridDimension.Columns,
        elements.columnsInput.valueAsNumber
      )
    )
  })

  elements.rowsInput.addEventListener(EVENT_TYPE_INPUT, () => {
    setNextStateAndRender(
      setGridDimension(
        getStateFn(),
        GridDimension.Rows,
        elements.rowsInput.valueAsNumber
      )
    )
  })

  elements.linkColumnsAndRowsInput.addEventListener(EVENT_TYPE_CHANGE, () => {
    setNextStateAndRender(
      setDimensionsLinked(
        getStateFn(),
        elements.linkColumnsAndRowsInput.checked
      )
    )
  })

  elements.algorithmInput.addEventListener(EVENT_TYPE_CHANGE, () => {
    const lineAlgorithm = elements.algorithmInput.value
    if (!isLineAlgorithm(lineAlgorithm)) {
      throw new Error(`Unknown type for LineAlgorithm: ${lineAlgorithm}`)
    }
    setNextStateAndRender(setLineAlgorithm(getStateFn(), lineAlgorithm))
  })

  elements.coordinateAXInput.addEventListener(EVENT_TYPE_INPUT, () => {
    setNextStateAndRender(
      setEndpointComponent(
        getStateFn(),
        Endpoint.A,
        Axis.X,
        elements.coordinateAXInput.valueAsNumber
      )
    )
  })

  elements.coordinateAYInput.addEventListener(EVENT_TYPE_INPUT, () => {
    setNextStateAndRender(
      setEndpointComponent(
        getStateFn(),
        Endpoint.A,
        Axis.Y,
        elements.coordinateAYInput.valueAsNumber
      )
    )
  })

  elements.coordinateBXInput.addEventListener(EVENT_TYPE_INPUT, () => {
    setNextStateAndRender(
      setEndpointComponent(
        getStateFn(),
        Endpoint.B,
        Axis.X,
        elements.coordinateBXInput.valueAsNumber
      )
    )
  })

  elements.coordinateBYInput.addEventListener(EVENT_TYPE_INPUT, () => {
    setNextStateAndRender(
      setEndpointComponent(
        getStateFn(),
        Endpoint.B,
        Axis.Y,
        elements.coordinateBYInput.valueAsNumber
      )
    )
  })
}
