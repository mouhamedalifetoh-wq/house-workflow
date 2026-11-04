---
description: Run typecheck and tests, then have the read-only reviewer judge the diff
allowed-tools: Bash(npm run typecheck), Bash(npm test), Bash(git diff:*), Bash(git rev-parse:*), Bash(git status)
---

Verify the current work:

1. Run `npm run typecheck` and `npm test`. Report each result with the exit status.
2. Record `git rev-parse --short HEAD` and whether the tree is dirty (`git status --short`).
3. Invoke the `code-reviewer` agent on `git diff HEAD` (or the last commit if clean) with this requirement: $ARGUMENTS
4. Summarise: typecheck result, test result, reviewer verdict, commit SHA. Green tests with an "incorrect" verdict is a failure; say so.
