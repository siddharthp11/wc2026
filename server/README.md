# Live Match Data Server

Go server for live match data APIs.

## Start the Server

From this directory, run:

```sh
go run ./cmd/api
```

The server starts on:

```txt
http://localhost:8080
```

Stop the server with `Ctrl+C`.

## Routes

### `GET /tournaments`

Returns up to 10 current tournaments for the requested season.

Query parameters:

- `season` - required 4-digit integer, for example `2026`

Example:

```sh
curl "http://localhost:8080/tournaments?season=2026"
```

Success response:

```json
{
  "tournaments": [
    {
      "id": 1,
      "name": "FIFA World Cup",
      "season": 2026,
      "type": "cup",
      "current": true
    }
  ]
}
```

Validation errors return HTTP 400:

```json
{
  "error": "season must be a 4-digit integer"
}
```

Tournament data currently comes from `internal/simulation_data/tournaments.json`.
