#!/usr/bin/env node
// The above shebang ensures Node.js (instead of bash) is used to run the compiled JS file.
import * as handler from "./handler";
import { renderTable } from "./utils/table";

type Command = "group" | "team" | "games";
function isCommand(maybeCommand: string): maybeCommand is Command {
  return ["group", "team", "games"].includes(maybeCommand);
}
const maybeCommand = process.argv[2];
if (isCommand(maybeCommand)) {
  let res: unknown;
  switch (maybeCommand) {
    case "group": {
      res = handler.teamToGroup(process.argv.slice(3));
      break;
    }
    case "team": {
      res = handler.teamDetails(process.argv[3]);
      break;
    }
    case "games": {
      const matches = handler.teamSchedule(process.argv.slice(3));
      res = renderTable(
        ["When", "Fixture", "Matchday", "Group", "Venue"],
        matches.map((m) => ({
          Matchday: m.round,
          When: `${m.datetime.toString()} `,
          Fixture: `${m.team1} - ${m.team2}`,
          Group: m.group,
          Venue: m.ground,
        })),
      );
      break;
    }
  }
  console.log(res);
} else {
  console.error("Invalid command");
}
