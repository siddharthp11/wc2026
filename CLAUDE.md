# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A CLI tool for querying FIFA World Cup 2026 data. The app provides access to tournament information including group assignments, team rosters, match schedules, stadium information, and qualifying playoff data.

## Project Structure

- **`router.ts`**: Main CLI entry point. Handles command routing (`group`, `team`, and `schedule` commands)
- **`handler.ts`**: Command handlers that load and query data files
- **`types.ts`**: TypeScript type definitions for all data structures (Teams, Groups, Players, etc.)
- **`data/`**: Data directory containing JSON files sourced from [openfootball/worldcup.json](https://github.com/openfootball/worldcup.json)
  - `worldcup.groups.json`: Group structure (A-H) and team assignments
  - `worldcup.squads.json`: Complete player rosters with positions and dates of birth
  - `worldcup.teams.json`: Team names and FIFA codes
  - `worldcup.json`: Full tournament data with match schedules
  - `worldcup.stadiums.json`: Venue information
  - `worldcup.quali_playoffs.json`: Qualifying playoff data

## Commands

```bash
# Install dependencies
npm install

# Look up which group(s) teams belong to (accepts multiple team names)
npm run group Brazil France

# Get detailed squad information for a specific team
npm run team Brazil

# Get match schedule for a team
npm run schedule Brazil
```

## Architecture Notes

The app uses a router/handler pattern:
- **`router.ts`**: Parses command-line arguments and routes to the appropriate handler in `handler.ts`
- **`handler.ts`**: Contains functions that load and query data files:
  - `teamToGroup(teams)`: Takes an array of team names (case-insensitive), searches `worldcup.groups.json`, and returns matching groups
  - `teamDetails(team)`: Takes a single team name, searches `worldcup.squads.json`, and returns team info with player roster
  - `teamSchedule(team)`: Takes a single team name, searches `worldcup.json`, and returns all matches for that team

Data files are loaded via `readFileSync` on each command execution. JSON parsing is typed using the type definitions from `types.ts`.

## Tech Stack

- **Language**: TypeScript 6.0.3
- **Runtime**: Node.js (via tsx 4.22.4 for direct TS execution)
- **No external dependencies** beyond dev tooling
