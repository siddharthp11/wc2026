package handlers

import (
	"net/http"
	"strconv"
	"unicode"

	handlerutils "match_data/internal/handlers/utils"
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
		handlerutils.WriteJSON(w, http.StatusBadRequest, errorResponse{
			Error: "season must be a 4-digit integer",
		})
		return
	}

	tournaments, err := services.GetTournaments(season)
	if err != nil {
		handlerutils.WriteJSON(w, http.StatusInternalServerError, errorResponse{
			Error: "failed to load tournaments",
		})
		return
	}

	handlerutils.WriteJSON(w, http.StatusOK, tournamentsResponse{
		Tournaments: tournaments,
	})
}

// --------------------- HELPER FUNCTIONS FOR INCOMING TYPE VALIDATION -----------------------------

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
