package server

import (
	"net/http"

	"match_data/internal/handlers"

	"github.com/go-chi/chi/v5"
)

func NewRouter() http.Handler {
	router := chi.NewRouter()
	router.Get("/tournaments", handlers.GetTournaments)

	return router
}
