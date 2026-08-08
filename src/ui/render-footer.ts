import type { AppState } from "../app/state"
import { lineAlgorithmToDisplay } from "../rasterization/rasterize-line"
import type { AppElements } from "./elements"

export function renderFooter(
  appElements: AppElements,
  appState: AppState
): void {
  const lineAlgorithm = lineAlgorithmToDisplay(appState.lineAlgorithm)
  appElements.footerStatusOutput.value = `Algorithm: ${lineAlgorithm} \u00b7 Origin: top-left`
}
