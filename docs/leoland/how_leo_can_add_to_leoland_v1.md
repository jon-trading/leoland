# How Leo Can Add to Leoland v1

## The easy way to contribute

Leo does not need to change engine code to help grow Leoland.

The main contribution lanes are:

- `data/contributions/leo/leo_ideas_inbox_v1.yaml`
- `data/contributions/leo/leo_regions_ideas_v1.yaml`
- `data/contributions/leo/leo_clubs_ideas_v1.yaml`
- `docs/leoland/universe/`

## Good things to add

- new cities
- new provinces or regions
- club identities
- party ideas
- national issues
- values and themes
- notes about what makes a region feel different

## Best practice

When adding something new, try to separate:

- **canon facts**: things Leo wants to be true in the world
- **flavour ideas**: atmosphere, culture, mood, identity
- **future mechanics ideas**: things that might later affect the simulator

## What not to worry about yet

Leo does not need to decide:

- final game balance
- final political math
- final event rules
- final football simulation rules
- code architecture

Those come later.

## Canon merge rule

The inbox files are not canon automatically.

The intended flow is:

1. Leo adds ideas to the inbox files or workshop helper.
2. Jon reviews what fits the world.
3. Canon-worthy ideas get promoted into `data/universe/*.yaml`.
4. Codex can help normalize and merge them later.

## The main principle

Leo's role is not just to suggest content.
Leo is helping define the world itself.

That means the universe seed files should stay easy to read and easy to change.
