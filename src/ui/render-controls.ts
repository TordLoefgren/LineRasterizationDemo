import type { AppState } from "../app/state"
import type { DemoElements } from "./elements"

export function renderControls(
  demoElements: DemoElements,
  appState: AppState
): void {
  const columns = appState.gridDimensions.columns
  const rows = appState.gridDimensions.rows

  // Set inputs.
  demoElements.columnsInput.value = String(columns)
  demoElements.rowsInput.value = String(rows)
  demoElements.linkColumnsAndRowsInput.checked = appState.areDimensionsLinked

  demoElements.algorithmInput.value = appState.lineAlgorithm

  demoElements.coordinateAXInput.value = String(
    appState.lineSegment.coordinateA.x
  )
  demoElements.coordinateAYInput.value = String(
    appState.lineSegment.coordinateA.y
  )

  demoElements.coordinateBXInput.value = String(
    appState.lineSegment.coordinateB.x
  )
  demoElements.coordinateBYInput.value = String(
    appState.lineSegment.coordinateB.y
  )

  // Set outputs.
  demoElements.columnsOutput.value = String(columns)
  demoElements.rowsOutput.value = String(rows)

  demoElements.coordinateAXOutput.value = String(
    appState.lineSegment.coordinateA.x
  )
  demoElements.coordinateAYOutput.value = String(
    appState.lineSegment.coordinateA.y
  )

  demoElements.coordinateBXOutput.value = String(
    appState.lineSegment.coordinateB.x
  )
  demoElements.coordinateBYOutput.value = String(
    appState.lineSegment.coordinateB.y
  )

  // Set constraints.
  demoElements.coordinateAXInput.max = String(columns - 1)
  demoElements.coordinateAYInput.max = String(rows - 1)

  demoElements.coordinateBXInput.max = String(columns - 1)
  demoElements.coordinateBYInput.max = String(rows - 1)
}
