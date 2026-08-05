# Line Rasterization Demo

Interactive TypeScript application for visualizing how line-drawing algorithms traverse a grid.

## Status

**In progress.**

The application currently supports configurable grid dimensions, linked row and column controls, a live summary, and canvas-based grid rendering.

This repository originally began as **Interface Lab**, a general frontend sandbox. It was later narrowed into a focused line-rasterization project.

## Purpose

The goal is to explore how line segments are converted into discrete grid cells while practicing frontend fundamentals through a small portfolio project.

The application will allow users to:

- configure a grid
- define a line segment
- select a rasterization algorithm
- inspect the cells traversed by the line
- compare different algorithms visually

The first planned algorithms are Bresenham's line algorithm and the Digital Differential Analyzer (DDA).

## Development approach

The first version is being built with vanilla HTML, CSS, and TypeScript.

This phase focuses on:

- semantic HTML
- component-oriented CSS
- TypeScript and DOM interaction
- browser events and application state
- responsive canvas rendering
- testable algorithm logic

After the vanilla version is complete, the application will be refactored to Vue to compare manual DOM management with a component-based approach.

## Tech stack

- HTML
- CSS
- TypeScript
- Vite
- Canvas API
- Vitest, planned
- Vue, planned

## Current milestone

Add configurable line-segment endpoints and render the segment on the grid.

## Later milestones

- implement Bresenham's line algorithm
- implement the Digital Differential Analyzer
- visualize traversed grid cells
- test the algorithm logic
- refactor the application to Vue
