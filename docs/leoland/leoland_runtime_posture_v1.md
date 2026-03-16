# Leoland Runtime Posture v1

## Current runtime truth

Leoland runs on stackhost1 as a local TypeScript prototype.

Verified command:

```bash
npx ts-node play.ts
```

## Environment

- Node.js: `v18.19.0`
- npm: `9.2.0`
- TypeScript execution: `ts-node`

## Current outcome

The current build path is healthy enough to:

- install dependencies with `npm ci`
- type-check with `npx tsc --noEmit`
- run the prototype from the canonical repo path

## Current limitations

- no public runtime
- no dev server
- no persistence layer
- no database
- no container/runtime topology yet
- current seed data still models Finland, not Leoland

## Operational posture

- canonical server repo: `/srv/leoland/leoland-mvp`
- imported snapshot source: `/home/jon/leoland-mvp`
- laptop is not required for day-to-day source-of-truth after intake
