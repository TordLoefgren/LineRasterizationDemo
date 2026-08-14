import type { AppState, GetStateFn, SetStateFn } from "../app/state"
import type { RouteId } from "../routing/router"
import { queryDemoElements } from "../ui/elements"
import { registerDemoEventListeners } from "../ui/events"
import type { AboutView } from "./about-view"
import type { AlgorithmsView } from "./algorithms-view"
import { renderDemoView, type DemoView } from "./demo-view"
import type { NotFoundView } from "./not-found-view"

export type View = AboutView | AlgorithmsView | DemoView | NotFoundView

export function mountView(
  routeId: RouteId,
  getStateFn: GetStateFn,
  setStateFn: SetStateFn
): View {
  let view: View

  switch (routeId) {
    case "demo":
      view = { kind: "demo", elements: queryDemoElements() }
      registerDemoEventListeners(view, getStateFn, setStateFn)
      break
    case "about":
      view = { kind: "about" }
      break
    case "algorithms":
      view = { kind: "algorithms" }
      break
    case "not-found":
      view = { kind: "not-found" }
      break

    default:
      assertNever(routeId)
  }

  return view
}

export function renderView(view: View, appState: AppState): void {
  switch (view.kind) {
    case "demo":
      renderDemoView(view, appState)
      break
    case "about":
    case "algorithms":
    case "not-found":
      return

    default:
      assertNever(view)
  }
}

function assertNever(_: never): never {
  throw new Error("This code path will never be taken.")
}
