# VERIFICATION

Every line names the commit or run it is about.

## House workflow
- Baseline typecheck and tests pass in CI — 547dc4c — https://github.com/mouhamedalifetoh-wq/house-workflow/actions/runs/41819506323 — conclusion: success
- Locally on baseline: `npm run typecheck` exit 0; `npm test` 4 pass, 0 fail — 547dc4c (run locally before the commit)
- CI goes red when typecheck is broken on purpose — 73ade08 — https://github.com/mouhamedalifetoh-wq/house-workflow/actions/runs/41819525291 — conclusion: failure (added `export const broken: number = "not a number"`; tsc TS2322)
- CI goes green after fix — b87988f (revert of 73ade08) — https://github.com/mouhamedalifetoh-wq/house-workflow/actions/runs/41819662331 — conclusion: success
- Hook script blocks a commit on a type error — 547dc4c — piped JSON into `.claude/hooks/block-commit-on-typecheck-fail.mjs` with a deliberate type error — exit 2 with tsc output; clean tree and non-commit commands exit 0
- NOT RUN: hook firing inside a live Claude Code session. Commit 73ade08 was made in a session that had not loaded the project settings, so the hook did not intercept it. To be demonstrated in the 1:1.

## Exam 2
- NOT YET DONE. Add: PR head commit and its green run, the defect with failing input and expected vs actual, the fix commit and its run.
