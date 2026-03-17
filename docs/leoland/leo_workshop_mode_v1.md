# Leo Workshop Mode v1

## Purpose

Workshop mode gives Leo a safe way to add world ideas without editing engine code or overwriting canon directly.

## Command

```bash
npm run workshop
```

## Good prompt ideas

- invent a new city
- what makes this region proud?
- what problem does this place worry about?
- what football club do people here support?
- what would a good leader do for this place?
- what unfair thing makes people angry here?

## Output posture

Workshop mode writes to:

- `data/contributions/leo/leo_ideas_inbox_v1.yaml`

Those entries are:

- real
- repo-tracked
- reviewable
- non-canonical until promoted

## Why this is useful

It lets Leo help shape the universe directly while keeping the simulator stable and understandable.
