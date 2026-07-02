CRUD CLI for world cup data.

## Commands

```bash
# Install dependencies and link the CLI globally
cd cli
npm install
npm run build
npm link

# After linking, use the `cup` CLI directly:
cup group Brazil France
cup team Brazil
cup games Brazil

# Or run via npm scripts without linking:
cd cli
npm run dev group Brazil France
npm run dev team Brazil
npm run dev games Brazil
```

## Architecture Notes

The app uses a router/handler pattern:

- **`cli/src/router.ts`**: Parses command-line arguments and routes to the appropriate handler in `cli/src/handler.ts`
- **`cli/src/handler.ts`**: Contains functions that load and query data files:
  - `teamToGroup(teams)`: Takes an array of team names (case-insensitive), searches `worldcup.groups.json`, and returns matching groups
  - `teamDetails(team)`: Takes a single team name, searches `worldcup.squads.json`, and returns team info with simplified player names
  - `teamSchedule(team)`: Takes a single team name, searches `worldcup.json`, and returns all matches for that team

Data files are loaded via `readFileSync` on each command execution. JSON parsing is typed using the type definitions from `cli/src/types.ts`.

## CLI Wiring

The `cup` global command is enabled by two things working together:

1. **`package.json` `bin` field**: Maps the `cup` command name to `./dist/router.js`. When `npm link` is run, npm symlinks this into the system's PATH.
2. **Shebang in `cli/src/router.ts`**: The first line (`#!/usr/bin/env node`) tells the OS to execute the file with Node.js when it's invoked directly as a binary.

Running `npm link` from `cli/` is all that's needed — no global install required.

To unlink, use `npm unlink -g cup`. Note: `npm unlink -g` takes the **package name** (the `name` field in `package.json`), not the command name from the `bin` field. In this project both happen to be `cup`, but they are distinct concepts.

## Tech Stack

- **Language**: TypeScript 6.0.3
- **Runtime**: Node.js
- **Build**: [tsup](https://tsup.egoist.dev/) — compiles TypeScript to ECMAScript (ES2020+)
- **Testing**: [Vitest](https://vitest.dev/) — fast unit test framework
- **Parsing**: [dayjs](https://day.js.org/) — lightweight date/time parsing and manipulation
- **Runtime Dependencies**:
  - `dayjs`: Date/time parsing in data handlers
- **Dev Dependencies**: `tsup`, `vitest`, TypeScript, and related tooling
