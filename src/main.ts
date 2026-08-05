import "./style.css"

interface AppElements {
  canvas: HTMLCanvasElement
  previewError: HTMLParagraphElement
  columnsInput: HTMLInputElement
  columnsOutput: HTMLOutputElement
  rowsInput: HTMLInputElement
  rowsOutput: HTMLOutputElement
  linkColumnsAndRowsInput: HTMLInputElement
  gridDimensionsOutput: HTMLOutputElement
  gridTotalCellsOutput: HTMLOutputElement
}

interface CanvasDisplayMetrics {
  cssWidth: number
  cssHeight: number
  devicePixelRatio: number
}

function requireElement<TElement extends Element>(selector: string): TElement {
  const element = document.querySelector<TElement>(selector)
  if (!element) {
    throw new Error(`Required element was not found: ${selector}`)
  }

  return element
}

function queryAppElements(): AppElements {
  return {
    canvas: requireElement<HTMLCanvasElement>("#preview-panel__canvas"),
    previewError: requireElement<HTMLParagraphElement>("#preview-panel__error"),
    columnsInput: requireElement<HTMLInputElement>(
      "#grid-settings__columns-input"
    ),
    columnsOutput: requireElement<HTMLOutputElement>(
      "#grid-settings__columns-output"
    ),
    rowsInput: requireElement<HTMLInputElement>("#grid-settings__rows-input"),
    rowsOutput: requireElement<HTMLOutputElement>(
      "#grid-settings__rows-output"
    ),
    linkColumnsAndRowsInput: requireElement<HTMLInputElement>(
      "#grid-settings__link"
    ),
    gridDimensionsOutput: requireElement<HTMLOutputElement>(
      "#grid-summary__dimensions"
    ),
    gridTotalCellsOutput: requireElement<HTMLOutputElement>(
      "#grid-summary__total-cells"
    )
  }
}

function resizeCanvasToDisplaySize(
  canvasElement: HTMLCanvasElement
): CanvasDisplayMetrics {
  const width = canvasElement.clientWidth
  const height = canvasElement.clientHeight
  const pixelRatio = window.devicePixelRatio || 1

  if (width <= 0 || height <= 0) {
    throw new Error("Canvas dimensions must be greater than zero")
  }

  const bufferWidth = Math.round(width * pixelRatio)
  const bufferHeight = Math.round(height * pixelRatio)

  if (
    canvasElement.width !== bufferWidth ||
    canvasElement.height !== bufferHeight
  ) {
    canvasElement.width = bufferWidth
    canvasElement.height = bufferHeight
  }

  return {
    cssWidth: width,
    cssHeight: height,
    devicePixelRatio: pixelRatio
  }
}

function drawGrid(
  canvasElement: HTMLCanvasElement,
  columnCount: number,
  rowCount: number
): void {
  const canvasContext = canvasElement.getContext("2d")
  if (!canvasContext) {
    throw new Error("Canvas context was unavailable")
  }

  const {
    cssWidth: canvasWidth,
    cssHeight: canvasHeight,
    devicePixelRatio
  } = resizeCanvasToDisplaySize(canvasElement)

  canvasContext.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)

  const cellSize = Math.min(canvasWidth / columnCount, canvasHeight / rowCount)

  const gridWidth = columnCount * cellSize
  const gridHeight = rowCount * cellSize

  const gridOffsetX = (canvasWidth - gridWidth) / 2
  const gridOffsetY = (canvasHeight - gridHeight) / 2

  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)

  for (let y = 0; y < rowCount; y++) {
    for (let x = 0; x < columnCount; x++) {
      canvasContext.fillStyle = (x + y) % 2 === 0 ? "gainsboro" : "silver"
      canvasContext.fillRect(
        gridOffsetX + cellSize * x,
        gridOffsetY + cellSize * y,
        cellSize,
        cellSize
      )
    }
  }
}

function updateGridSummary(
  gridDimensionsOutputElement: HTMLOutputElement,
  gridTotalCellsOutputElement: HTMLOutputElement,
  columns: number,
  rows: number
): void {
  const cellCount = columns * rows

  gridDimensionsOutputElement.value = `${columns} \u00D7 ${rows}`
  gridTotalCellsOutputElement.value = `${cellCount} ${cellCount === 1 ? "cell" : "cells"}`
}

function renderApp(appElements: AppElements): void {
  try {
    const columnsCount = appElements.columnsInput.valueAsNumber
    const rowsCount = appElements.rowsInput.valueAsNumber

    appElements.columnsOutput.value = String(columnsCount)
    appElements.rowsOutput.value = String(rowsCount)

    drawGrid(appElements.canvas, columnsCount, rowsCount)
    updateGridSummary(
      appElements.gridDimensionsOutput,
      appElements.gridTotalCellsOutput,
      columnsCount,
      rowsCount
    )

    appElements.previewError.hidden = true
    appElements.previewError.textContent = ""
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred"

    appElements.previewError.hidden = false
    appElements.previewError.textContent = errorMessage

    console.error(error)
  }
}

function synchronizeLinkedDimension(
  sourceElement: HTMLInputElement,
  linkedElement: HTMLInputElement,
  isLinked: boolean
): void {
  if (isLinked) {
    linkedElement.valueAsNumber = sourceElement.valueAsNumber
  }
}

function registerEventListeners(appElements: AppElements): void {
  window.addEventListener("resize", () => {
    renderApp(appElements)
  })

  appElements.columnsInput.addEventListener("input", () => {
    synchronizeLinkedDimension(
      appElements.columnsInput,
      appElements.rowsInput,
      appElements.linkColumnsAndRowsInput.checked
    )
    renderApp(appElements)
  })

  appElements.rowsInput.addEventListener("input", () => {
    synchronizeLinkedDimension(
      appElements.rowsInput,
      appElements.columnsInput,
      appElements.linkColumnsAndRowsInput.checked
    )
    renderApp(appElements)
  })

  appElements.linkColumnsAndRowsInput.addEventListener("change", () => {
    if (appElements.linkColumnsAndRowsInput.checked) {
      appElements.rowsInput.valueAsNumber =
        appElements.columnsInput.valueAsNumber
    }

    renderApp(appElements)
  })
}

function main(): void {
  const appElements = queryAppElements()

  registerEventListeners(appElements)
  renderApp(appElements)
}

main()
