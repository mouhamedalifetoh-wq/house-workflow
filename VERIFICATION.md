# VERIFICATION

Every line names the commit or run it is about.

## House workflow
- Baseline typecheck and tests pass in CI — 547dc4c — https://github.com/mouhamedalifetoh-wq/house-workflow/actions/runs/41819506323 — conclusion: success
- Locally on baseline: `npm run typecheck` exit 0; `npm test` 4 pass, 0 fail — 547dc4c (run locally before the commit)
- CI goes red when typecheck is broken on purpose — 73ade08 — https://github.com/mouhamedalifetoh-wq/house-workflow/actions/runs/41819525291 — conclusion: failure (added `export const broken: number = "not a number"`; tsc TS2322)
- CI goes green after fix — b87988f (revert of 73ade08) — https://github.com/mouhamedalifetoh-wq/house-workflow/actions/runs/41819662331 — conclusion: success
- Hook script blocks a commit on a type error — 547dc4c — piped JSON into `.claude/hooks/block-commit-on-typecheck-fail.mjs` with a deliberate type error — exit 2 with tsc output; clean tree and non-commit commands exit 0
- Hook fires inside a live Claude Code session — hook from 547dc4c, tested on tree at d4df22b (no commit created, so no SHA of its own) — with `export const bad: number = "x";` staged in `src/slugify.ts`, a separate `git commit -m "test"` call was blocked: `Commit blocked: typecheck failed ... src/slugify.ts(11,14): error TS2322`. Tree reset to d4df22b afterwards.
- Known limit: the hook checks the tree when the Bash call starts. Appending a bad line and committing in the same call is NOT blocked (observed: commit d483e8c, local only, reset to d4df22b). Edit and commit must be separate calls.

## Exam 2
- NOT YET DONE. Add: PR head commit and its green run, the defect with failing input and expected vs actual, the fix commit and its run.
