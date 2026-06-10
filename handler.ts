import { readFileSync } from "node:fs";
import type { Teams, Groups, Group, Schedule } from "./types";
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

function teamSchedule(team: string) {
  const file = readFileSync(getPath(), FORMAT);
  const parsed = JSON.parse(file) as Schedule;
  const teamToLower = team.toLowerCase();
  return parsed.matches.filter(
    (m) =>
      m.team1.toLowerCase() === teamToLower ||
      m.team2.toLowerCase() === teamToLower,
  );
}

export { teamDetails, teamSchedule, teamToGroup };
