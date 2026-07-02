package main

import (
	"log"
	"net/http"

	"match_data/internal/server"
)

const addr = ":8080"

func main() {
	router := server.NewRouter()

	log.Printf("starting live match data server on %s", addr)
	if err := http.ListenAndServe(addr, router); err != nil {
		log.Fatal(err)
	}
}
