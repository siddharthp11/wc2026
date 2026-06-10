type Position = "GK" | "MF" | "FW" | "DF";

interface Group {
  name: string;
  teams: Array<string>;
}
interface Player {
  number: number;
  pos: Position;
  name: string;
  dob: string;
}
interface Groups {
  name: string;
  groups: Array<Group>;
}
interface Team {
  name: string;
  fifa_code: string;
  group: string;
  players: Array<Player>;
}
type Teams = Array<Team>;

interface Match {
  round: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  group: string;
  ground: string;
}
interface Schedule {
  name: string;
  matches: Array<Match>;
}

export type { Teams, Groups, Group, Position, Match, Schedule };
