import type { AppState } from "../app/state"
import { lineAlgorithmToDisplay } from "../rasterization/rasterize-line"
import type { AppElements } from "./elements"

export function renderSummary(
  appElements: AppElements,
  appState: AppState,
  rasterizedCellsCount: number
): void {
  const cellCount =
    appState.gridDimensions.columns * appState.gridDimensions.rows

  appElements.gridDimensionsOutput.value = `${appState.gridDimensions.columns} \u00d7 ${appState.gridDimensions.rows}`
  appElements.gridTotalCellsOutput.value = `${cellCount} ${cellCount === 1 ? "cell" : "cells"}`

  const { coordinateA: coordinateA, coordinateB: coordinateB } =
    appState.lineSegment

  appElements.lineSegmentOutput.value = `(${coordinateA.x}, ${coordinateA.y}) \u2192 (${coordinateB.x}, ${coordinateB.y})`
  appElements.rasterizedCellsOutput.value = `${rasterizedCellsCount} ${rasterizedCellsCount === 1 ? "cell" : "cells"}`
  appElements.lineAlgorithmOutput.value = lineAlgorithmToDisplay(
    appState.lineAlgorithm
  )
}

export function renderSummaryFailure(
  appElements: AppElements,
  appState: AppState
): void {
  appElements.gridDimensionsOutput.value = "Unknown"
  appElements.gridTotalCellsOutput.value = "Unknown"

  appElements.lineSegmentOutput.value = "Unknown"
  appElements.rasterizedCellsOutput.value = "Unknown"
  appElements.lineAlgorithmOutput.value = lineAlgorithmToDisplay(
    appState.lineAlgorithm
  )
}
