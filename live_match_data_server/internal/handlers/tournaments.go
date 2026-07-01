package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"unicode"

	"match_data/internal/models"
	"match_data/internal/services"
)

type tournamentsResponse struct {
	Tournaments []models.Tournament `json:"tournaments"`
}

type errorResponse struct {
	Error string `json:"error"`
}

func GetTournaments(w http.ResponseWriter, r *http.Request) {
	season, ok := parseSeason(r.URL.Query().Get("season"))
	if !ok {
		writeJSON(w, http.StatusBadRequest, errorResponse{
			Error: "season must be a 4-digit integer",
		})
		return
	}

	tournaments, err := services.GetTournaments(season)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, errorResponse{
			Error: "failed to load tournaments",
		})
		return
	}

	writeJSON(w, http.StatusOK, tournamentsResponse{
		Tournaments: tournaments,
	})
}

func parseSeason(raw string) (int, bool) {
	if len(raw) != 4 {
		return 0, false
	}

	for _, char := range raw {
		if !unicode.IsDigit(char) {
			return 0, false
		}
	}

	season, err := strconv.Atoi(raw)
	if err != nil || season < 1000 || season > 9999 {
		return 0, false
	}

	return season, true
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}
