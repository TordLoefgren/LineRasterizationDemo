import type { AppState } from "../app/state"
import { lineAlgorithmToDisplay } from "../rasterization/rasterize-line"
import type { DemoElements } from "./elements"

export function renderSummary(
  demoElements: DemoElements,
  appState: AppState,
  rasterizedCellsCount: number
): void {
  const cellCount =
    appState.gridDimensions.columns * appState.gridDimensions.rows

  demoElements.gridDimensionsOutput.value = `${appState.gridDimensions.columns} \u00d7 ${appState.gridDimensions.rows}`
  demoElements.gridTotalCellsOutput.value = `${cellCount} ${cellCount === 1 ? "cell" : "cells"}`

  const { coordinateA: coordinateA, coordinateB: coordinateB } =
    appState.lineSegment

  demoElements.lineSegmentOutput.value = `(${coordinateA.x}, ${coordinateA.y}) \u2192 (${coordinateB.x}, ${coordinateB.y})`
  demoElements.rasterizedCellsOutput.value = `${rasterizedCellsCount} ${rasterizedCellsCount === 1 ? "cell" : "cells"}`
  demoElements.lineAlgorithmOutput.value = lineAlgorithmToDisplay(
    appState.lineAlgorithm
  )
}

export function renderSummaryFailure(
  demoElements: DemoElements,
  appState: AppState
): void {
  demoElements.gridDimensionsOutput.value = "Unknown"
  demoElements.gridTotalCellsOutput.value = "Unknown"

  demoElements.lineSegmentOutput.value = "Unknown"
  demoElements.rasterizedCellsOutput.value = "Unknown"
  demoElements.lineAlgorithmOutput.value = lineAlgorithmToDisplay(
    appState.lineAlgorithm
  )
}
