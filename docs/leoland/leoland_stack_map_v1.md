# Leoland Stack Map v1

## Current shape

Leoland is currently a very small TypeScript prototype rather than a full application stack.

## Repo structure

- `play.ts`: current entrypoint for the prototype run
- `engine/types.ts`: core domain types for country, leader, values, decisions, and effects
- `engine/data.ts`: current seed data and example decisions
- `engine/engine.ts`: turn execution logic and derived-stat updates
- `package.json`: minimal Node/TypeScript dependency manifest
- `tsconfig.json`: TypeScript configuration
- `RUN_LEOLAND.bat`: Windows helper from the imported snapshot

## Runtime posture

This is currently:

- a local Node/TypeScript prototype
- CLI-like in execution style
- state-in-memory only
- single-country and single-turn
- not yet a server app, web app, or game shell

## What it is not yet

It is not yet:

- a persistent simulation runtime
- a world-state model
- a province/party simulator
- a UI-driven game shell
- a deployable public product
