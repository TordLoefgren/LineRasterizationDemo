# Line Rasterization Demo

An interactive application for visualizing how line-drawing algorithms select cells in a discrete grid.

[View the live demo](https://tordloefgren.github.io/LineRasterizationDemo/)

## Status

**In progress.**

The application currently supports configurable grid dimensions, linked row and column controls, a live grid summary, and responsive canvas rendering.

The current milestone is to add configurable line-segment endpoints and render the segment on the grid.

## Purpose

The main goal of this project is to strengthen and demonstrate my understanding of frontend web development through a small, focused application.

The first version is being built with vanilla HTML, CSS, and TypeScript so I can work directly with the web platform, including the Document Object Model, browser events, application state, responsive canvas rendering, and testable application logic.

Once the vanilla version is complete, I plan to rebuild it with Vue and compare manual DOM management with a component-based approach.

The line-rasterization topic gives the project a concrete technical problem to solve rather than making it a purely visual frontend exercise.

## Motivation

The topic is also partly inspired by a C++ pet project I have just started, where I want to experiment with creating an occupancy grid map from ultrasonic sensor data using an Arduino Uno R3.

Exploring Bresenham's line algorithm and the Digital Differential Analyzer (DDA) gives me a better understanding of how sensor measurements can be mapped onto discrete grid cells. The grid map project is still very early, but it gives this demo a practical connection to something I may build later.

## Current features

- Configurable grid dimensions
- Linked row and column controls
- Live grid summary
- Responsive canvas-based grid rendering

## Roadmap

- Add configurable line-segment endpoints
- Render the line segment on the grid
- Implement Bresenham's line algorithm
- Implement the Digital Differential Analyzer
- Visualize traversed grid cells
- Test the algorithm logic with Vitest
- Rebuild the application with Vue

## Tech stack

- HTML
- CSS
- TypeScript
- Vite
- Canvas API
- Vitest, planned
- Vue, planned
