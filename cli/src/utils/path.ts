import { existsSync } from "node:fs";
import path from "node:path";

const candidateBasePaths = [
  path.join(import.meta.dirname, "..", "data"),
  path.join(import.meta.dirname, "..", "..", "data"),
];

const BASEPATH =
  candidateBasePaths.find((candidate) => existsSync(candidate)) ??
  candidateBasePaths[0];

type Resource = "groups" | "squads";
const getPath = (resource?: Resource) =>
  `${BASEPATH}/worldcup${resource ? "." + resource : ""}.json`;

export { getPath };
