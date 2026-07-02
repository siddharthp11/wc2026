package server

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"match_data/internal/models"
)

type tournamentsResponse struct {
	Tournaments []models.Tournament `json:"tournaments"`
}

type errorResponse struct {
	Error string `json:"error"`
}

func TestGetTournamentsRouteReturnsTournaments(t *testing.T) {
	request := httptest.NewRequest(http.MethodGet, "/tournaments?season=2026", nil)
	recorder := httptest.NewRecorder()

	NewRouter().ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("expected status %d, got %d", http.StatusOK, recorder.Code)
	}

	var response tournamentsResponse
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if len(response.Tournaments) != 10 {
		t.Fatalf("expected 10 tournaments, got %d", len(response.Tournaments))
	}
}

func TestGetTournamentsRouteRequiresSeason(t *testing.T) {
	request := httptest.NewRequest(http.MethodGet, "/tournaments", nil)
	recorder := httptest.NewRecorder()

	NewRouter().ServeHTTP(recorder, request)

	assertJSONError(t, recorder, http.StatusBadRequest)
}

func TestGetTournamentsRouteRejectsInvalidSeason(t *testing.T) {
	tests := []string{
		"/tournaments?season=abc",
		"/tournaments?season=26",
		"/tournaments?season=20266",
	}

	for _, path := range tests {
		t.Run(path, func(t *testing.T) {
			request := httptest.NewRequest(http.MethodGet, path, nil)
			recorder := httptest.NewRecorder()

			NewRouter().ServeHTTP(recorder, request)

			assertJSONError(t, recorder, http.StatusBadRequest)
		})
	}
}

func TestGetTournamentsRouteReturnsEmptyListWhenNoCurrentSeasonMatches(t *testing.T) {
	request := httptest.NewRequest(http.MethodGet, "/tournaments?season=2030", nil)
	recorder := httptest.NewRecorder()

	NewRouter().ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("expected status %d, got %d", http.StatusOK, recorder.Code)
	}

	var response tournamentsResponse
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if len(response.Tournaments) != 0 {
		t.Fatalf("expected no tournaments, got %d", len(response.Tournaments))
	}
}

func assertJSONError(t *testing.T, recorder *httptest.ResponseRecorder, status int) {
	t.Helper()

	if recorder.Code != status {
		t.Fatalf("expected status %d, got %d", status, recorder.Code)
	}

	var response errorResponse
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if response.Error == "" {
		t.Fatal("expected error response")
	}
}
