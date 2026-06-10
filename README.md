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

## Development

```bash
npm run dev [...args] #  eg. npm run dev group teamName
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

## Data Source

This project uses World Cup data from [openfootball/worldcup.json](https://github.com/openfootball/worldcup.json).

## License

ISC
