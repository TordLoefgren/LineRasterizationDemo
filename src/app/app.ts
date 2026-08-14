import {
  navigate,
  renderCurrentRoute,
  renderNavigation
} from "../routing/router"
import {
  EVENT_TYPE_CLICK,
  EVENT_TYPE_POPSTATE,
  EVENT_TYPE_RESIZE
} from "../ui/events"
import type { AppShellElements } from "../ui/elements"
import { mountView, renderView, type View } from "../views/view"
import {
  createDefaultAppState,
  type GetStateFn,
  type SetStateFn
} from "./state"

const NAV_LINK_ELEMENT = "a"

export function startApp(elements: AppShellElements): void {
  let appState = createDefaultAppState()
  let currentView: View

  // Define convenience closures.
  const getStateFn: GetStateFn = () => appState

  const setStateFn: SetStateFn = (nextState): void => {
    appState = nextState
  }

  const updateCurrentRouteFn = () => {
    const currentRoute = renderCurrentRoute(elements.mainContent)

    renderNavigation(elements.navigation, window.location.pathname)

    currentView = mountView(currentRoute, getStateFn, setStateFn)
    renderView(currentView, getStateFn())
  }

  updateCurrentRouteFn()

  elements.navigation.addEventListener(EVENT_TYPE_CLICK, (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    if (!(event.target instanceof Element)) {
      return
    }

    const linkElement = event.target.closest(NAV_LINK_ELEMENT)
    if (!(linkElement instanceof HTMLAnchorElement)) {
      return
    }

    event.preventDefault()

    navigate(linkElement.href)
    updateCurrentRouteFn()
  })
  window.addEventListener(EVENT_TYPE_RESIZE, () =>
    renderView(currentView, getStateFn())
  )
  window.addEventListener(EVENT_TYPE_POPSTATE, updateCurrentRouteFn)
}
