import { expect, it } from "vitest"
import { smokeTest } from "./smoke"

it("runs the test setup", () => {
  expect(smokeTest()).toBe(true)
})
