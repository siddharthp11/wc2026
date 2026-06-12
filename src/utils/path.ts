import path from "node:path";

const BASEPATH = path.join(import.meta.dirname, "..", "data");

type Resource = "groups" | "squads";
const getPath = (resource?: Resource) =>
  `${BASEPATH}/worldcup${resource ? "." + resource : ""}.json`;

export { getPath };
