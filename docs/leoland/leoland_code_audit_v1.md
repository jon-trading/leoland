# Leoland Code Audit v1

## Overall assessment

Leoland is currently best described as a prototype shell with an early simulation engine.

It already has:

- a clean small codebase
- typed core domain structures
- a turn executor
- decision/effect mechanics
- basic derived-stat logic
- an editable YAML-backed Leoland world seed

It does not yet have:

- Leoland-specific world-state data
- multiple regions/provinces
- party/electorate models
- persistence
- UI shell
- campaign/game loop beyond a single scripted turn

## What works

- dependency install
- TypeScript compile
- local run from canonical repo
- stat mutation and derived-score updates

## What is placeholder

- the runtime is still a single-turn prototype
- the decision set is still deliberately small and illustrative
- player choice flow is hard-coded in `play.ts`
- no input loop or save state exists

## What is clearly Leo/game-specific already

- values model
- leader quality model
- civic and ethical framing in decisions
- legacy scoring and unrest/trust/cohesion interplay
- Leoland canon seed for country identity and club/regional culture

## What is still generic engine scaffolding

- typed effects model
- path-based stat mutation
- turn executor
- decision option handling

## Risks / cleanup notes

- path-based mutation via `any` is flexible but easy to misuse later
- current state model is flat and will need a world-state schema before scale-up
- seed-to-runtime mapping is still a prototype adapter, not the final world-state schema
- `RUN_LEOLAND.bat` is import baggage, not a server-first runtime path

## Honest conclusion

Leoland is promising, but it is not yet a game architecture to scale blindly.

The right next step is to preserve the canon seed, keep the current prototype runnable, and then define the first real Leoland world-state shape before adding major mechanics.
