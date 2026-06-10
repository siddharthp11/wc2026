"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
// 1. Ability to get group + schedule for a single team
function teamToGroup(teams) {
    const file = (0, node_fs_1.readFileSync)("2026/worldcup.groups.json", "utf-8");
    const hashedTeams = new Set(teams.map((t) => t.toLowerCase()));
    const groups = JSON.parse(file);
    const results = [];
    groups.groups.forEach((group) => {
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
const args = process.argv.slice(2);
const res = teamToGroup(args);
console.log(res);
