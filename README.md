# Leoland MVP

This repository is the canonical server-side source-of-truth for the imported `leoland-mvp` prototype.

Leoland is a Leo-first country leadership / governance game in early prototype form. It is values-led, terminal-first for now, and built to grow from a clean world seed rather than from buried constants.

## Origin

- imported snapshot source: `/home/jon/leoland-mvp`
- canonical server repo: `/srv/leoland/leoland-mvp`

## Current runtime posture

- local TypeScript prototype
- entrypoint: `play.ts`
- current run path: `npm run play`
- type-check path: `npm run check`
- public deployment: none

## Current project posture

- canonical repo: `/srv/leoland/leoland-mvp`
- imported snapshot source: `/home/jon/leoland-mvp`
- current runtime shape: terminal-first prototype
- current world seed: `data/universe/*.yaml`
- football companion: separate sibling project later, not merged here

## What the repo currently contains

- a small TypeScript turn-simulation prototype
- a canonical Leoland country seed
- a clubs/regions seed for later cultural and regional identity work
- a Leo-friendly documentation path for expanding the universe safely

## Quick start

```bash
npm ci
npm run check
npm run play
```

## Notes

This repo was promoted server-first so day-to-day development no longer depends on a laptop copy as the operational source-of-truth.
