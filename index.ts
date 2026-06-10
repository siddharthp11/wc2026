import { readFileSync } from "node:fs";
import type { Teams, Groups, Group, Position, Match, Schedule } from "./types";
// 1. Ability to get group + schedule for a single team

const getPath = (path: string) => `2026/worldcup.${path}.json`;

function teamToGroup(teams: Array<string>) {
  const file = readFileSync(getPath("groups"), "utf-8");
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
  const file = readFileSync(getPath("squads"), "utf-8");
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
  const file = readFileSync("2026/worldcup.json", "utf-8");
  const parsed = JSON.parse(file) as Schedule;
  const teamToLower = team.toLowerCase();
  return parsed.matches.filter(
    (m) =>
      m.team1.toLowerCase() === teamToLower ||
      m.team2.toLowerCase() === teamToLower,
  );
}

type Command = "group" | "team" | "schedule";
function isCommand(maybeCommand: string): maybeCommand is Command {
  return ["group", "team", "schedule"].includes(maybeCommand);
}

const maybeCommand = process.argv[2];
if (isCommand(maybeCommand)) {
  let res: unknown;
  switch (maybeCommand) {
    case "group": {
      res = teamToGroup(process.argv.slice(3));
      break;
    }
    case "team": {
      res = teamDetails(process.argv[3]);
      break;
    }
    case "schedule": {
      res = teamSchedule(process.argv[3]);
      break;
    }
  }
  console.log(res);
} else {
  console.error("Invalid command");
}
