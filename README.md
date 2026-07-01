# Interface Lab

Interactive TypeScript frontend sandbox for exploring user interface elements, CSS, state, browser behavior, and DOM rendering.

## Status

**In progress.**

This project is currently in its early development phase. The initial setup is in place, and the first version is being built with vanilla HTML, CSS, and TypeScript.

## Purpose

Interface Lab is a small portfolio project for practicing and demonstrating frontend fundamentals.

The goal is to build an interactive browser-based sandbox where user input changes state, styling, and rendered output. The project is meant to explore how common frontend pieces fit together:

- semantic HTML structure
- CSS layout and styling
- TypeScript logic
- Document Object Model (DOM) interaction
- UI state
- form behavior and validation
- testable frontend logic

This is not intended to be a large design system or a full component library. It is a focused learning project with a practical portfolio result.

## Development plan

The project will be developed in two main phases.

### 1. Vanilla TypeScript version

The first version is built with HTML, CSS, and TypeScript without a frontend framework.

This phase is focused on understanding the browser fundamentals directly:

```text
user input → state update → DOM update → visual result
```

### 2. Vue refactor

After the vanilla version is working, the project will be refactored to Vue.

The purpose of this phase is to compare manual DOM rendering with a component-based frontend approach, while keeping the same general project idea and behavior.

## Planned direction

The finished project should include one or more small interactive labs where the user can change inputs and immediately see the result in a live preview.

The exact scope may change as the project develops.

## Tech stack

Current / planned stack:

- HTML
- CSS
- TypeScript
- Vite
- Vitest
- Vue, planned for the later refactor

## What this project is meant to demonstrate

This project is meant to show that I am actively strengthening my web development fundamentals through a practical, structured portfolio project.

The focus is on:

- understanding frontend fundamentals before relying on a framework
- writing clear and maintainable TypeScript
- separating state and logic from rendering where possible
- building small, testable pieces of functionality
- using a simple project as a foundation for later framework-based development

## Current milestone

Build the first vanilla TypeScript version with a simple interactive UI lab.

## Later milestone

Refactor the project to Vue and compare the framework-based structure with the original vanilla implementation.
