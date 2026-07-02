package services

import "testing"

func TestGetTournamentsFiltersToCurrentSeasonAndCapsResults(t *testing.T) {
	tournaments, err := GetTournaments(2026)
	if err != nil {
		t.Fatalf("GetTournaments returned error: %v", err)
	}

	if len(tournaments) != maxTournaments {
		t.Fatalf("expected %d tournaments, got %d", maxTournaments, len(tournaments))
	}

	for _, tournament := range tournaments {
		if tournament.Season != 2026 {
			t.Fatalf("expected season 2026, got %d for tournament %q", tournament.Season, tournament.Name)
		}
		if !tournament.Current {
			t.Fatalf("expected current tournament, got non-current tournament %q", tournament.Name)
		}
	}
}

func TestGetTournamentsPreservesFixtureOrder(t *testing.T) {
	tournaments, err := GetTournaments(2026)
	if err != nil {
		t.Fatalf("GetTournaments returned error: %v", err)
	}

	if len(tournaments) < 2 {
		t.Fatalf("expected at least two tournaments, got %d", len(tournaments))
	}

	if tournaments[0].Name != "FIFA World Cup" {
		t.Fatalf("expected first tournament to preserve fixture order, got %q", tournaments[0].Name)
	}
	if tournaments[1].Name != "Premier League" {
		t.Fatalf("expected second tournament to preserve fixture order, got %q", tournaments[1].Name)
	}
}

func TestGetTournamentsReturnsEmptyListWhenNoCurrentSeasonMatches(t *testing.T) {
	tournaments, err := GetTournaments(2030)
	if err != nil {
		t.Fatalf("GetTournaments returned error: %v", err)
	}

	if len(tournaments) != 0 {
		t.Fatalf("expected no tournaments, got %d", len(tournaments))
	}
}
