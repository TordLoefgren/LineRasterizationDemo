import "./style.css"
import { startApp } from "./app/app"
import { queryAppShellElements } from "./ui/elements"

function main(): void {
  const appShellElements = queryAppShellElements()
  startApp(appShellElements)
}

main()
