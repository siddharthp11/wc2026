package simulation_data

import (
	"embed"
	"encoding/json"

	"match_data/internal/models"
)

//go:embed tournaments.json
var tournamentsFS embed.FS

func LoadTournaments() ([]models.Tournament, error) {
	data, err := tournamentsFS.ReadFile("tournaments.json")
	if err != nil {
		return nil, err
	}

	var tournaments []models.Tournament
	if err := json.Unmarshal(data, &tournaments); err != nil {
		return nil, err
	}

	return tournaments, nil
}
