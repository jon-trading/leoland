# Leo Onboarding Pack

This is the one document to start from.

It tells you:

- where to connect
- which folders matter
- what to run first
- where to put new ideas
- how the football app fits in
- what is canon and what is still just an idea

## The Two Main Leoland Folders

### 1. Main Leoland game

This is the main game project:

`/srv/leoland/leoland-mvp`

This is the canonical repo.

That means:

- this is the right place to work on the main Leoland game
- this is where the game shell lives
- this is where the canon world seed lives

### 2. Footy companion app

This is the football companion project area:

`/srv/leoland/leo-footy`

This is separate on purpose.

That means:

- it is part of the same wider Leoland universe
- but it is **not** merged into the main Leoland repo
- you can work on it without breaking the main game

## How To Connect

Use SSH to connect to the server.

From PowerShell on your PC:

```powershell
ssh leoland
```

If you do not have the shortcut set up, use:

```powershell
ssh leo@YOUR_SERVER_IP_OR_HOSTNAME
```

In VS Code, use the **Remote - SSH** extension and open the server folder you want to work in.

## What To Open In VS Code

If you want to work on the **main Leoland game**, open:

`/srv/leoland/leoland-mvp`

If you want to work on the **football companion app**, open:

`/srv/leoland/leo-footy`

Try not to mix them up.

## First Commands For Leoland

From `/srv/leoland/leoland-mvp`, run:

```bash
git status
npm run check
npm run play
npm run workshop
```

What they do:

- `git status` tells you whether files have changed
- `npm run check` checks the code
- `npm run play` runs the playable shell
- `npm run workshop` helps you add new ideas safely

## What Lives Where In Leoland

### Game shell

- [play.ts](/srv/leoland/leoland-mvp/play.ts)
- [engine](/srv/leoland/leoland-mvp/engine)

This is the game logic and playable loop.

### Canon world seed

- [data/universe](/srv/leoland/leoland-mvp/data/universe)

This is the official world seed.

It includes things like:

- country shape
- regions
- clubs
- identity and mood inputs

### Leo idea inbox

- [data/contributions/leo](/srv/leoland/leoland-mvp/data/contributions/leo)

This is where your new ideas should go first.

Important rule:

- inbox ideas are real
- inbox ideas are welcome
- inbox ideas are **not** canon automatically
- good ideas get reviewed and then promoted into the canon files later

## Canon Vs Inbox

This is the most important distinction in the repo.

### Canon

Canon lives in:

- `data/universe/`

Canon means:

- this is part of the real Leoland world
- the game can rely on it
- it has already been reviewed

### Inbox

Inbox lives in:

- `data/contributions/leo/`

Inbox means:

- this is a possible new idea
- it might become canon later
- it should not automatically change the main world

That way you can add ideas freely without wrecking the game structure.

## Good First Things To Do

If this is your first proper session, do this:

1. Connect to the server
2. Open `/srv/leoland/leoland-mvp`
3. Run `npm run play`
4. Play through one full run
5. Run `npm run workshop`
6. Add one new idea
7. Open the inbox YAML files
8. Open the universe seed files and compare them

That is already a useful contribution.

## Good Kinds Of Ideas To Add

Leoland needs things like:

- new cities
- new regions
- what makes a place proud
- what a place worries about
- clubs and rivalries
- regional traditions
- what good leadership looks like in that place
- what feels unfair to the people there
- issues that might create tension or hope

## What Not To Worry About Yet

You do **not** need to solve:

- all the engine code
- final balancing
- final politics math
- final event rules
- databases
- deployment
- how the football companion will connect in code

That is not your job right now.

Your best contribution is:

- world ideas
- regional identity
- culture
- atmosphere
- values
- interesting questions

## What The Game Is Trying To Be

Leoland is not trying to reward:

- cruelty
- domination
- greed
- empty power

It is trying to reward:

- fairness
- responsibility
- patience
- trust
- learning from mistakes
- taking care of people well over time

If you are ever unsure whether something fits, ask:

`Does this make Leoland feel wiser, fairer, and more alive?`

## About The Footy App

Your footy app lives separately at:

`/srv/leoland/leo-footy`

That is the right posture for now.

It means:

- the football world can grow
- Leoland can stay stable
- both can influence each other later
- but they do not have to share code yet

For now:

- treat them as siblings
- not one merged project

## Simple Rule Of Thumb

If you are:

- building the country game -> use `leoland-mvp`
- building the football app -> use `leo-footy`
- inventing new world ideas -> put them in the Leo inbox first

## Useful Docs

- [Welcome to Leoland](/srv/leoland/leoland-mvp/docs/leoland/leoland_welcome_for_leo_v1.md)
- [How Leo can add to Leoland](/srv/leoland/leoland-mvp/docs/leoland/how_leo_can_add_to_leoland_v1.md)
- [Leo workshop mode](/srv/leoland/leoland-mvp/docs/leoland/leo_workshop_mode_v1.md)
- [Leoland design principles](/srv/leoland/leoland-mvp/docs/leoland/leoland_design_principles_v1.md)
- [Leoland first playable shell](/srv/leoland/leoland-mvp/docs/leoland/leoland_first_playable_shell_v1.md)
- [Leoland turn model](/srv/leoland/leoland-mvp/docs/leoland/leoland_turn_model_v1.md)

## Very Short Version

If you forget almost everything else, remember this:

- main game: `/srv/leoland/leoland-mvp`
- footy app: `/srv/leoland/leo-footy`
- run: `npm run play`
- add ideas: `npm run workshop`
- canon lives in `data/universe/`
- new ideas live in `data/contributions/leo/`

That is enough to get going well.
