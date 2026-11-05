# VERIFICATION

Every line names the commit or run it is about. Anything not run is marked NOT RUN. A local result is pinned to the commit it was run on; a local result is not a CI run.

## GitHub Actions runs (headSha re-checked with `gh run view <id> --json url,headSha,conclusion`)
- Baseline CI — 547dc4c — https://github.com/mouhamedalifetoh-wq/house-workflow/actions/runs/41819506323 — conclusion: success
- CI goes red when typecheck is broken on purpose — 73ade08 — https://github.com/mouhamedalifetoh-wq/house-workflow/actions/runs/41819525291 — conclusion: failure (added `export const broken: number = "not a number"`; tsc TS2322)
- CI goes green on the next commit — b87988f (revert of 73ade08) — https://github.com/mouhamedalifetoh-wq/house-workflow/actions/runs/41819662331 — conclusion: success
- CI on the VERIFICATION.md update — d4df22b — https://github.com/mouhamedalifetoh-wq/house-workflow/actions/runs/41819766922 — conclusion: success
- NOT RUN: CI for 261373a. The commit is local only; `git branch -r --contains 261373a` printed nothing.

## Local checks on 261373a (tree clean: `git status --short` printed nothing)
- `/verify` (`.claude/commands/verify.md`) — 261373a — `npm run typecheck` exit 0; `npm test` exit 0, 4 pass 0 fail. The first capture of the test exit status was blank (zsh `PIPESTATUS`), so the test command was rerun for the exit code. `$ARGUMENTS` was empty, so the reviewer was judged against the commit's own purpose, not a supplied requirement.
- `code-reviewer` agent, run 1 (inside `/verify`) — 261373a — verdict "incorrect". Two of its claims did not hold when checked: `wc -l src/slugify.ts` = 9 lines and `git show d483e8c` shows a blank line plus the bad line appended, so `(11,14)` is correct. Its point that d483e8c is not durable evidence is valid.
- `code-reviewer` agent, run 2 (full review of diff, latest commit, slugify, tests) — 261373a — empty `git diff HEAD`; findings are non-ASCII handling gaps in `src/slugify.ts:7`, no failing tests, but untested non-ASCII paths. I re-ran its inputs with `node --import tsx`: `"Straße"` → `"stra-e"`, `"Æon"` → `"on"`, `"Łódź"` → `"odz"`, `"日本語"` → `""`, `"Hello 世界 World"` → `"hello-world"`, `"Isık"` → `"is-k"`. The reviewer reported 3 tool calls in its usage record but listed more commands; anything it reported beyond those re-runs is NOT RUN by me. `git status --short` was empty afterwards, so it edited nothing.
- `verify-claims` skill (`/verify-claims`) — 261373a — ran `gh run view` on the four run IDs above; each run's headSha equalled the cited SHA. It flagged the unbacked lines still marked below. It changed no files.

## PreToolUse hook (`.claude/hooks/block-commit-on-typecheck-fail.mjs`, added in 547dc4c, not modified since per `git log --name-status`)
- Blocks a failing typecheck (isolated clone) — 261373a — clone made with `git clone`, remote removed, deleted afterwards. After staging `export const bad: number = "x";`, the hook was fed `{"tool_name":"Bash","cwd":"<clone>","tool_input":{"command":"git commit -m test"}}` on stdin: exit 2, stderr `Commit blocked: typecheck failed ... src/slugify.ts(11,14): error TS2322`.
- Allows a passing typecheck (isolated clone) — 261373a — same setup after changing the line to `export const bad: number = 1;`: hook exit 0 with no output, then `git commit -m "test"` in the clone exited 0 (clone commit 415058a). The clone was deleted and never pushed, so 415058a cannot be re-checked.
- NOT RUN: the harness blocking a commit inside the isolated clone — 261373a (the commit the clone was made from). The shell working directory resets to the main repo after each call, so a live `git commit` would have type-checked the main tree.
- Hook blocks inside a live Claude Code session — hook from 547dc4c, tested on tree at d4df22b (no commit created, so no SHA of its own) — with `export const bad: number = "x";` staged in `src/slugify.ts`, a separate `git commit -m "test"` call was blocked: `Commit blocked: typecheck failed ... src/slugify.ts(11,14): error TS2322`. Tree reset to d4df22b afterwards.
- Hook script on piped JSON — 547dc4c — piped JSON into the hook with a deliberate type error — exit 2 with tsc output; clean tree and non-commit commands exit 0. Carried over from the earlier session; not re-run for this update.
- Known same-call bypass — d483e8c — appending a bad line and `git commit` in one Bash call was NOT blocked (the hook ran before the line existed). `git show d483e8c` shows the appended lines. d483e8c is local only and reachable only through the reflog.
- NOT RUN: hook bypass regression test — d483e8c (where the manual bypass was observed). No automated test exists for the same-call bypass; the only evidence is the manual observation above. Also NOT RUN: `git -C <dir> commit` (suspected not matched by the hook regex; read from the source, not executed).

## Baseline
- Locally on baseline: `npm run typecheck` exit 0; `npm test` 4 pass, 0 fail — 547dc4c. Carried over from the earlier session; not re-run for this update.

## Exam 2
- NOT RUN: no pull request has been received. Repository head when this was written: 261373a. Add: PR head commit and its green run, the defect with failing input and expected vs actual, the fix commit and its run.
