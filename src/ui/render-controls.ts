import type { AppState } from "../app/state"
import type { AppElements } from "./elements"

export function renderControls(
  appElements: AppElements,
  appState: AppState
): void {
  const columns = appState.gridDimensions.columns
  const rows = appState.gridDimensions.rows

  // Set inputs.
  appElements.columnsInput.value = String(columns)
  appElements.rowsInput.value = String(rows)
  appElements.linkColumnsAndRowsInput.checked = appState.areDimensionsLinked

  appElements.algorithmInput.value = appState.lineAlgorithm

  appElements.coordinateAXInput.value = String(
    appState.lineSegment.coordinateA.x
  )
  appElements.coordinateAYInput.value = String(
    appState.lineSegment.coordinateA.y
  )

  appElements.coordinateBXInput.value = String(
    appState.lineSegment.coordinateB.x
  )
  appElements.coordinateBYInput.value = String(
    appState.lineSegment.coordinateB.y
  )

  // Set outputs.
  appElements.columnsOutput.value = String(columns)
  appElements.rowsOutput.value = String(rows)

  appElements.coordinateAXOutput.value = String(
    appState.lineSegment.coordinateA.x
  )
  appElements.coordinateAYOutput.value = String(
    appState.lineSegment.coordinateA.y
  )

  appElements.coordinateBXOutput.value = String(
    appState.lineSegment.coordinateB.x
  )
  appElements.coordinateBYOutput.value = String(
    appState.lineSegment.coordinateB.y
  )

  // Set constraints.
  appElements.coordinateAXInput.max = String(columns - 1)
  appElements.coordinateAYInput.max = String(rows - 1)

  appElements.coordinateBXInput.max = String(columns - 1)
  appElements.coordinateBYInput.max = String(rows - 1)
}
