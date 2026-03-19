# Leoland Scenario Engine v1

## Purpose

The scenario engine turns Leoland from a static shell into a living short-session society game.

Scenarios are not random chaos cards.
They are activated from visible state:

- issue pressure
- region pressure
- institution strain
- urgency

## What a scenario contains

Each scenario now carries:

- title
- theme
- urgency
- affected regions
- affected institutions
- issue tracks involved
- what is at stake
- intro text
- decision options

Each option includes:

- humane logic
- likely tradeoff
- country metric effects
- regional effects
- institution effects
- issue-track effects
- treasury effect
- reflection text

## How activation works

The engine chooses the next scenario from a bounded catalog by scoring:

- issue pressure
- region pressure
- institution strain
- urgency bonus

This means scenarios feel connected to country conditions instead of feeling arbitrary.

## How consequences work

When the player chooses an option, the engine:

1. updates country metrics
2. updates treasury
3. updates affected regions
4. updates affected institutions
5. updates issue tracks
6. applies a light interdependence pass
7. records a turn outcome
8. advances the country to the next turn and next scenario

## Why this matters

The player can now discover that:

- care compounds
- neglect spreads
- one-region success at others' expense is unstable
- strong institutions matter
- humane choices can be strategically powerful

That is the point of Leoland.
