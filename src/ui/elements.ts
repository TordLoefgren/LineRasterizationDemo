export interface AppElements {
  // Grid settings.
  columnsInput: HTMLInputElement
  columnsOutput: HTMLOutputElement
  rowsInput: HTMLInputElement
  rowsOutput: HTMLOutputElement
  linkColumnsAndRowsInput: HTMLInputElement

  // Line segment.
  algorithmInput: HTMLSelectElement

  coordinateAXInput: HTMLInputElement
  coordinateAXOutput: HTMLOutputElement
  coordinateAYInput: HTMLInputElement
  coordinateAYOutput: HTMLOutputElement

  coordinateBXInput: HTMLInputElement
  coordinateBXOutput: HTMLOutputElement
  coordinateBYInput: HTMLInputElement
  coordinateBYOutput: HTMLOutputElement

  // Summary.
  gridDimensionsOutput: HTMLOutputElement
  gridTotalCellsOutput: HTMLOutputElement
  lineAlgorithmOutput: HTMLOutputElement
  lineSegmentOutput: HTMLOutputElement
  rasterizedCellsOutput: HTMLOutputElement

  // Preview.
  canvas: HTMLCanvasElement
  previewError: HTMLParagraphElement

  // Footer.
  footerStatusOutput: HTMLOutputElement
}

export function requireElement<TElement extends Element>(
  selector: string
): TElement {
  const element = document.querySelector<TElement>(selector)
  if (!element) {
    throw new Error(`Required element was not found: ${selector}`)
  }

  return element
}

export function queryAppElements(): AppElements {
  return {
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

    algorithmInput: requireElement<HTMLSelectElement>(
      "#line-segment__algorithm-input"
    ),
    coordinateAXInput: requireElement<HTMLInputElement>(
      "#line-segment__ax-input"
    ),
    coordinateAXOutput: requireElement<HTMLOutputElement>(
      "#line-segment__ax-output"
    ),
    coordinateAYInput: requireElement<HTMLInputElement>(
      "#line-segment__ay-input"
    ),
    coordinateAYOutput: requireElement<HTMLOutputElement>(
      "#line-segment__ay-output"
    ),

    coordinateBXInput: requireElement<HTMLInputElement>(
      "#line-segment__bx-input"
    ),
    coordinateBXOutput: requireElement<HTMLOutputElement>(
      "#line-segment__bx-output"
    ),
    coordinateBYInput: requireElement<HTMLInputElement>(
      "#line-segment__by-input"
    ),
    coordinateBYOutput: requireElement<HTMLOutputElement>(
      "#line-segment__by-output"
    ),

    gridDimensionsOutput: requireElement<HTMLOutputElement>(
      "#summary__dimensions"
    ),
    gridTotalCellsOutput: requireElement<HTMLOutputElement>(
      "#summary__total-cells"
    ),
    lineAlgorithmOutput: requireElement<HTMLOutputElement>(
      "#summary__line-algorithm"
    ),
    lineSegmentOutput: requireElement<HTMLOutputElement>(
      "#summary__line-segment"
    ),
    rasterizedCellsOutput: requireElement<HTMLOutputElement>(
      "#summary__rasterized-cells"
    ),

    canvas: requireElement<HTMLCanvasElement>("#preview-panel__canvas"),
    previewError: requireElement<HTMLParagraphElement>("#preview-panel__error"),

    footerStatusOutput: requireElement<HTMLOutputElement>("#app-footer__status")
  }
}
