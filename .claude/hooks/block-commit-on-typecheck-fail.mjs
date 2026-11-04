#!/usr/bin/env node
// PreToolUse hook: block `git commit` while `npm run typecheck` fails.
// Exit code 2 blocks the tool call and feeds stderr back to Claude.
import { spawnSync } from "node:child_process";

let raw = "";
for await (const chunk of process.stdin) raw += chunk;

let input;
try {
  input = JSON.parse(raw);
} catch {
  process.exit(0); // not our payload; do not interfere
}

const command = input?.tool_input?.command ?? "";
// Match `git commit` anywhere in a command chain (e.g. `git add . && git commit -m x`).
if (!/(^|[;&|]\s*|\s)git\s+(-[^\s]+\s+)*commit(\s|$)/.test(command)) process.exit(0);

const cwd = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
const result = spawnSync("npm", ["run", "--silent", "typecheck"], {
  cwd,
  encoding: "utf8",
});

if (result.status === 0) process.exit(0);

const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
console.error(
  `Commit blocked: typecheck failed. Fix the type errors, then commit again.\n\n${output}`,
);
process.exit(2);
