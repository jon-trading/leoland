# Leoland Runtime Posture v1

## Current runtime truth

Leoland runs on stackhost1 as a local TypeScript prototype.

Verified command:

```bash
npm run play
```

## Environment

- Node.js: `v18.19.0`
- npm: `9.2.0`
- TypeScript execution: `ts-node`

## Current outcome

The current build path is healthy enough to:

- install dependencies with `npm ci`
- type-check with `npm run check`
- run the prototype from the canonical repo path
- load Leoland world seed data from repo-tracked YAML

## Current limitations

- no public runtime
- no dev server
- no persistence layer
- no database
- no container/runtime topology yet
- current runtime is still terminal-first and single-turn

## Operational posture

- canonical server repo: `/srv/leoland/leoland-mvp`
- imported snapshot source: `/home/jon/leoland-mvp`
- laptop is not required for day-to-day source-of-truth after intake

## Product posture

- current posture: terminal-first prototype
- next sensible runtime: tiny local playable shell
- later possible domain: `leoland.jon-trading.com`
- later hosted posture should follow the simulator, not lead it
