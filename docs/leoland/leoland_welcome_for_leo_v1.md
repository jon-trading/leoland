# Welcome To Leoland

This is Leo's home for building the Leoland world.

Leoland is not finished yet. That is fine. Right now it is a small playable game shell with a growing world behind it.

The aim is simple:

- make Leoland feel like a real country
- make choices matter
- reward good leadership, fairness, patience, and learning
- give Leo a real way to shape the world without needing to understand the whole engine first

## What To Open

If you are working on Leoland, this is the folder that matters:

`/srv/leoland/leoland-mvp`

This is the canonical server repo.

That means:

- this is the right place to read and edit files
- this is the right place to run the game
- this is the right place to add new ideas

## First Commands

Run these from the Leoland folder:

```bash
git status
npm run check
npm run play
npm run workshop
```

What they do:

- `git status`: shows whether anything has changed
- `npm run check`: checks that the TypeScript code still makes sense
- `npm run play`: runs the playable shell
- `npm run workshop`: helps capture new ideas for the world

## What Lives Where

### The game shell

- [play.ts](/srv/leoland/leoland-mvp/play.ts)
- [engine](/srv/leoland/leoland-mvp/engine)

This is the playable part.

### The real Leoland world seed

- [data/universe](/srv/leoland/leoland-mvp/data/universe)

This is the canon seed layer.

It contains things like:

- country setup
- regions
- clubs
- identity and mood inputs

### Leo's idea inbox

- [data/contributions/leo](/srv/leoland/leoland-mvp/data/contributions/leo)

This is where new ideas should go first.

Important:

- inbox ideas are welcome
- inbox ideas are not automatically canon
- they get reviewed and then promoted into the canon seed if they fit

That keeps the world fun and creative without becoming chaotic.

## Good First Things To Try

If this is your first session, do this:

1. Run `npm run play`
2. Play through one full run
3. Run `npm run workshop`
4. Add one new idea
5. Open the inbox YAML files and read what is there
6. Open the universe seed files and compare them with the inbox

## Good Kinds Of Ideas

Leoland needs ideas like:

- new cities
- new regions
- what makes a place proud
- what a place worries about
- clubs and rivalries
- what people think a good leader should do
- events or pressures that make the country harder to govern well

## What Not To Worry About Yet

You do not need to solve:

- the whole engine
- all the balancing
- final game rules
- databases
- deployment
- the football companion app

That is not your job right now.

The best contribution is:

- clear world ideas
- good questions
- interesting regional differences
- values that make the country feel alive

## What The Game Is Trying To Teach

Leoland is not supposed to reward being cruel or just grabbing power.

It should reward:

- fairness
- responsibility
- patience
- trust
- learning from mistakes
- taking care of people over time

If you are ever unsure whether an idea fits, ask:

`Does this make Leoland feel wiser, fairer, and more alive?`

## Useful Docs

- [How Leo can add to Leoland](/srv/leoland/leoland-mvp/docs/leoland/how_leo_can_add_to_leoland_v1.md)
- [Leo workshop mode](/srv/leoland/leoland-mvp/docs/leoland/leo_workshop_mode_v1.md)
- [Leoland design principles](/srv/leoland/leoland-mvp/docs/leoland/leoland_design_principles_v1.md)
- [Leoland first playable shell](/srv/leoland/leoland-mvp/docs/leoland/leoland_first_playable_shell_v1.md)
- [Leoland turn model](/srv/leoland/leoland-mvp/docs/leoland/leoland_turn_model_v1.md)

## Short Version

If you forget everything else, remember this:

- open `/srv/leoland/leoland-mvp`
- run `npm run play`
- put new ideas in `data/contributions/leo/`
- treat `data/universe/` as the canon layer
- ask questions when something feels confusing

That is enough for a strong start.
