import notFoundTemplate from "../templates/not-found.html?raw"
import demoTemplate from "../templates/demo.html?raw"
import aboutTemplate from "../templates/about.html?raw"
import algorithmsTemplate from "../templates/algorithms.html?raw"

export const NOT_FOUND_PATH = "/not-found"
export const DEMO_PATH = "/"
export const ABOUT_PATH = "/about"
export const ALGORITHMS_PATH = "/algorithms"

interface RouteDefinition {
  readonly id: string
  readonly template: string
  readonly documentTitle: string
}

const routesByPath = {
  [DEMO_PATH]: {
    id: "demo",
    template: demoTemplate,
    documentTitle: "Line Rasterization Demo"
  },
  [NOT_FOUND_PATH]: {
    id: "not-found",
    template: notFoundTemplate,
    documentTitle: "Page Not Found | Line Rasterization Demo"
  },
  [ABOUT_PATH]: {
    id: "about",
    template: aboutTemplate,
    documentTitle: "About | Line Rasterization Demo"
  },
  [ALGORITHMS_PATH]: {
    id: "algorithms",
    template: algorithmsTemplate,
    documentTitle: "Algorithms | Line Rasterization Demo"
  }
} as const satisfies Record<string, RouteDefinition>

type RoutePath = keyof typeof routesByPath
type RegisteredRoute = (typeof routesByPath)[RoutePath]

export type RouteId = RegisteredRoute["id"]

export function navigate(url: string): void {
  window.history.pushState({}, "", url)
}

function isRoutePath(value: string): value is RoutePath {
  return Object.hasOwn(routesByPath, value)
}

export function renderNavigation(
  navigationElement: HTMLElement,
  currentPath: string
) {
  const links = navigationElement.querySelectorAll<HTMLAnchorElement>("a")

  links.forEach((link) => {
    if (new URL(link.href).pathname === currentPath) {
      link.setAttribute("aria-current", "page")
    } else {
      link.removeAttribute("aria-current")
    }
  })
}

export function renderCurrentRoute(mainContentElement: HTMLElement): RouteId {
  const pathname = window.location.pathname || DEMO_PATH
  const appPath = pathname.slice(import.meta.env.BASE_URL.length - 1)
  const routePath = isRoutePath(appPath) ? appPath : NOT_FOUND_PATH
  const route = routesByPath[routePath]

  mainContentElement.innerHTML = route.template
  document.title = route.documentTitle

  return route.id
}
