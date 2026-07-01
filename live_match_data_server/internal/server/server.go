package server

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func NewRouter() http.Handler {
	router := chi.NewRouter()

	return router
}
