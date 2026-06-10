import { readFileSync } from "node:fs";
import type { Teams, Groups, Group, Position } from "./types";
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

type Command = "group" | " team";
interface CommandArgs {
  group: Array<string>;
  team: string;
}

const fn = process.argv[2];
let res: unknown;
if (fn === "group") {
  const args: CommandArgs["group"] = process.argv.slice(3);
  res = teamToGroup(args);
}
if (fn === "team") {
  const args: CommandArgs["team"] = process.argv[3];
  res = teamDetails(args);
}

console.log(res);
