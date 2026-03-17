# Leoland Companion Apps Posture v1

## Current rule

The football league / score generator is part of the same universe, but not part of the same repo by default.

## Why

The main Leoland repo is the home for:

- country leadership simulation
- governance/world-state logic
- Leo's core world seed

The football companion may later contribute:

- regional mood
- local pride
- rivalry
- headlines
- prestige
- political/cultural colour

But that does not mean it belongs in the same codebase yet.

## Current posture

- core simulator repo: `/srv/leoland/leoland-mvp`
- future sibling candidate: `/srv/leoland/leoland-league`

## Relationship model

Shared universe, separate repos unless there is a strong reason to merge later.

## Why this is safer

It prevents:

- universe sprawl hidden inside engine code
- premature coupling
- game design confusion
- one project's runtime assumptions leaking into another
