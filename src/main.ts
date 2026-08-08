import "./style.css"
import { startApp } from "./app/app"
import { queryAppElements } from "./ui/elements"

function main(): void {
  const appElements = queryAppElements()
  startApp(appElements)
}

main()
