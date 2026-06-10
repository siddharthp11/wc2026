# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A CLI tool for querying FIFA World Cup 2026 data. The app provides access to tournament information including group assignments, team rosters, match schedules, and qualifying playoff data.

## Project Structure

- **`src/router.ts`**: Main CLI entry point. Handles command routing (`group`, `team`, and `games` commands)
- **`src/handler.ts`**: Command handlers that load and query data files
- **`src/types.ts`**: TypeScript type definitions for all data structures (Teams, Groups, Players, etc.)
- **`data/`**: Data directory containing JSON files sourced from [openfootball/worldcup.json](https://github.com/openfootball/worldcup.json)
  - `worldcup.groups.json`: Group structure (A-H) and team assignments
  - `worldcup.squads.json`: Complete player rosters with positions and dates of birth
  - `worldcup.json`: Full tournament data with match schedules
  - `worldcup.stadiums.json`: Venue information
  - `worldcup.quali_playoffs.json`: Qualifying playoff data

## Commands

```bash
# Install dependencies and link the CLI globally
npm install
npm link

# After linking, use the `cup` CLI directly:
cup group Brazil France
cup team Brazil
cup games Brazil

# Or run via npm scripts without linking:
npm run group Brazil France
npm run team Brazil
npm run games Brazil
```

## Architecture Notes

The app uses a router/handler pattern:
- **`src/router.ts`**: Parses command-line arguments and routes to the appropriate handler in `src/handler.ts`
- **`src/handler.ts`**: Contains functions that load and query data files:
  - `teamToGroup(teams)`: Takes an array of team names (case-insensitive), searches `worldcup.groups.json`, and returns matching groups
  - `teamDetails(team)`: Takes a single team name, searches `worldcup.squads.json`, and returns team info with simplified player names
  - `teamSchedule(team)`: Takes a single team name, searches `worldcup.json`, and returns all matches for that team

Data files are loaded via `readFileSync` on each command execution. JSON parsing is typed using the type definitions from `src/types.ts`.

## CLI Wiring

The `cup` global command is enabled by two things working together:

1. **`package.json` `bin` field**: Maps the `cup` command name to `./dist/router.js`. When `npm link` is run, npm symlinks this into the system's PATH.
2. **Shebang in `src/router.ts`**: The first line (`#!/usr/bin/env node`) tells the OS to execute the file with Node.js when it's invoked directly as a binary.

Running `npm link` from the project root is all that's needed — no global install required.

To unlink, use `npm unlink -g cup`. Note: `npm unlink -g` takes the **package name** (the `name` field in `package.json`), not the command name from the `bin` field. In this project both happen to be `cup`, but they are distinct concepts.

## Tech Stack

- **Language**: TypeScript 6.0.3
- **Runtime**: Node.js (via tsx 4.22.4 for direct TS execution)
- **No external dependencies** beyond dev tooling
