package services

import (
	"match_data/internal/models"
	"match_data/internal/simulation_data"
)

const maxTournaments = 10

func GetTournaments(season int) ([]models.Tournament, error) {
	tournaments, err := simulation_data.LoadTournaments()
	if err != nil {
		return nil, err
	}

	filtered := make([]models.Tournament, 0, maxTournaments)
	for _, tournament := range tournaments {
		if tournament.Season != season || !tournament.Current {
			continue
		}

		filtered = append(filtered, tournament)
		if len(filtered) == maxTournaments {
			break
		}
	}

	return filtered, nil
}
