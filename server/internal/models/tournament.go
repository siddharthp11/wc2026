package models

type TournamentType string

const (
	TournamentTypeLeague TournamentType = "league"
	TournamentTypeCup    TournamentType = "cup"
)

type Tournament struct {
	ID      int            `json:"id"`
	Name    string         `json:"name"`
	Season  int            `json:"season"`
	Type    TournamentType `json:"type"`
	Current bool           `json:"current"`
}
