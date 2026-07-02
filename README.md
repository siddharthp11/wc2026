# World Cup 2026 Monorepo

This repository contains two self-contained projects:

- `cli/` - TypeScript command-line tool for querying World Cup 2026 data.
- `live_match_data_server/` - Go API server for live match data.

## CLI

```sh
cd cli
npm install
npm run build
npm link
```

Common development commands:

```sh
cd cli
npm run dev group Brazil France
npm run dev team Brazil
npm run dev games Brazil
npm test
npm run typecheck
```

## Live Match Data Server

```sh
cd live_match_data_server
go run ./cmd/api
```

Common development commands:

```sh
cd live_match_data_server
go test ./...
```
