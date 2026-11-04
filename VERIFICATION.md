# VERIFICATION

Every line names the commit or run it is about. Format: claim — commit — check — observed.
Fill in real SHAs and run URLs after pushing; do not leave placeholders in the submitted version.

## House workflow
- Typecheck passes on baseline — `<sha>` — `npm run typecheck` — exit 0
- Tests pass on baseline — `<sha>` — `npm test` — 4 pass, 0 fail
- CI red when typecheck broken on purpose — `<broken-sha>` — `<red-run-url>` — conclusion: failure at "Typecheck" step
- CI green after fix — `<fix-sha>` — `<green-run-url>` — conclusion: success
- Hook blocks commit on type error — `<sha>` — attempted `git commit` with a type error — blocked, exit 2 (demonstrated live in 1:1)

## Exam 2 (PR written by Claude, tests green, code wrong)
- PR head commit — `<sha>` — `<run-url>` — tests: green
- Defect found — `<sha>` — input `<x>` returns `<actual>`, requirement says `<expected>` — reproduced by `<command>`
- Fix — `<sha>` — `<run-url>` — new regression test fails on `<sha-before>` and passes on `<sha-after>`

## Not verified
- List anything you did not run, marked NOT RUN.
