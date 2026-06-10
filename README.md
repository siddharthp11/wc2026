# World Cup 2026 CLI

A command-line tool for querying FIFA World Cup 2026 data, including team groups, match schedules, and squad information.

## Features

- **Group Lookup**: Find which group a team belongs to
- **Team Details**: Get squad information for any participating team
- **Comprehensive Data**: Access to all 2026 World Cup match schedules, group assignments, stadiums, and player rosters

## Installation

```bash
npm install
npm run build
npm link
```

`npm link` registers the `cup` command globally on your machine so you can run it from anywhere.

## Uninstall

```bash
npm unlink -g cup
```

## Usage

### Get Team Group Information

Find the group(s) that one or more teams are in:

```bash
cup group Brazil France
```

### Get Team Details

Get detailed squad information for a specific team:

```bash
cup team Brazil
```

### Get Team Match Schedule

View all matches for a specific team:

```bash
cup games Brazil
```

## Project Structure

```
src/
├── router.ts                  # CLI entry point and command router
├── handler.ts                 # Command handlers and data queries
└── types.ts                   # TypeScript type definitions

data/
├── worldcup.json              # Complete tournament data and match schedule
├── worldcup.groups.json       # Group assignments and team groupings
├── worldcup.squads.json       # Complete player rosters for each team
├── worldcup.stadiums.json     # Stadium information
└── worldcup.quali_playoffs.json # Qualifying playoff data
```

## Data Files

### Teams

- Team names and FIFA codes
- Group assignments

### Squads

- Complete player rosters per team
- Player information (name, number, position, date of birth)

### Groups

- Group structure (A-H)
- Team assignments per group

### Match Schedule

- All tournament matches
- Dates, times, locations
- Group stage and knockout rounds

### Stadiums

- Host venues and locations

## Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **CLI Tool**: tsx (TypeScript executor)

## Development

```bash
# Run group lookup
npm run group TeamName

# Run team details
npm run team TeamName

# Run schedule lookup
npm run games TeamName
```

## Data Source

This project uses World Cup data from [openfootball/worldcup.json](https://github.com/openfootball/worldcup.json).

## License

ISC
