import { readFileSync } from "node:fs";
import type { Teams, Groups, Group, Schedule } from "./types";
import { handleSplitDateTime } from "./utils/date";
// 1. Ability to get group + schedule for a single team

const getPath = (path?: string) =>
  `data/worldcup${path ? "." + path : ""}.json`;
const FORMAT = "utf-8";

function teamToGroup(teams: Array<string>) {
  const file = readFileSync(getPath("groups"), FORMAT);
  const hashedTeams = new Set(teams.map((t) => t.toLowerCase()));
  const parsed = JSON.parse(file) as Groups;
  const results: Array<Group> = [];

  parsed.groups.forEach((group) => {
    let groupAdded = false;
    group.teams.forEach((t) => {
      if (hashedTeams.has(t.toLowerCase()) && !groupAdded) {
        results.push(group);
        groupAdded = true;
      }
    });
  });
  return results;
}
function teamDetails(team: string) {
  const file = readFileSync(getPath("squads"), FORMAT);
  const parsed = JSON.parse(file) as Teams;
  const teamToLower = team.toLowerCase();
  const details = parsed.find((t) => t.name.toLowerCase() === teamToLower);
  if (details) {
    return {
      ...details,
      players: details.players.map((player) => player.name),
    };
  }
  return undefined;
}

const GROUP_PATTERN = new RegExp(/Group\s([A-Z])/);
const MATCHDAY_PATTERN = new RegExp(/Matchday\s([0-9]+)/);

function teamSchedule(teams: Array<String>) {
  const file = readFileSync(getPath(), FORMAT);
  const parsed = JSON.parse(file) as Schedule;
  const hashed = new Set(teams.map((t) => t.toLowerCase()));
  return parsed.matches
    .filter(
      (m) =>
        hashed.has(m.team1.toLowerCase()) || hashed.has(m.team2.toLowerCase()),
    )
    .map(({ date, time, team1, team2, round, group, ground }) => ({
      date,
      time,
      team1,
      team2,
      round: round.match(MATCHDAY_PATTERN)?.at(1) ?? "Unknown",
      group: group.match(GROUP_PATTERN)?.at(1) ?? "Unknown",
      ground,
      datetime: handleSplitDateTime(date, time),
    }));
}

export { teamDetails, teamSchedule, teamToGroup };
