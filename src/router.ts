import * as handler from "./handler";

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
      res = handler.teamSchedule(process.argv[3]);
      break;
    }
  }
  console.log(res);
} else {
  console.error("Invalid command");
}
