# Leoland MVP

This repository is the canonical server-side source-of-truth for the imported `leoland-mvp` prototype.

Leoland is a Leo-first country leadership / governance game in early prototype form. It is values-led, mobile-first and desktop-friendly, and built to grow from a clean world seed rather than from buried constants.

## Origin

- imported snapshot source: `/home/jon/leoland-mvp`
- canonical server repo: `/srv/leoland/leoland-mvp`

## Current runtime posture

- local TypeScript terminal prototype plus mobile-first app shell
- entrypoint: `play.ts`
- current run path: `npm run play`
- type-check path: `npm run check`
- Leo workshop path: `npm run workshop`
- mobile shell path: `app/`
- public deployment: none

## Current project posture

- canonical repo: `/srv/leoland/leoland-mvp`
- imported snapshot source: `/home/jon/leoland-mvp`
- current runtime shape: terminal prototype plus mobile-first app shell
- current world seed: `data/universe/*.yaml`
- football companion: separate sibling project later, not merged here

## What the repo currently contains

- a small TypeScript turn-simulation prototype
- a canonical Leoland country + region seed
- a bounded four-turn terminal shell
- a mobile-first, desktop-friendly app shell with real world-state and scenarios
- a clubs/regions seed for later cultural and regional identity work
- a Leo inbox lane under `data/contributions/leo/`
- a Leo-friendly documentation path for expanding the universe safely

## Quick start

```bash
npm ci
npm run check
npm run play
npm run workshop
cd app && npm install && cd ..
npm run mobile:check
npm run mobile:build
```

## New here?

Start with:

- [Leo onboarding pack](/srv/leoland/leoland-mvp/docs/leoland/leo_onboarding_pack_v1.md)
- [Welcome to Leoland](/srv/leoland/leoland-mvp/docs/leoland/leoland_welcome_for_leo_v1.md)
- [How Leo can add to Leoland](/srv/leoland/leoland-mvp/docs/leoland/how_leo_can_add_to_leoland_v1.md)
- [Leo workshop mode](/srv/leoland/leoland-mvp/docs/leoland/leo_workshop_mode_v1.md)

## Notes

This repo was promoted server-first so day-to-day development no longer depends on a laptop copy as the operational source-of-truth.

## Experience shell

The mobile-first, desktop-friendly experience shell now lives in `app/`. Use the root scripts `npm run mobile:check` and `npm run mobile:build` to verify it.

If you have not installed the mobile shell dependencies yet, run `cd app && npm install` once first.
