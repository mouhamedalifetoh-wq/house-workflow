---
name: verify-claims
description: Use when writing or updating VERIFICATION.md, or when reporting that work is done, fixed, or passing. Ensures every claim is pinned to a commit SHA or a CI run.
---

# Verify claims

Every line of `VERIFICATION.md` must be falsifiable and pinned.

## Line format
`- <claim> — <commit SHA (7+ chars)> | <run URL> — <command or check> — <observed result>`

## Steps
1. For each claim, identify the exact commit: `git rev-parse --short HEAD` or `git log --oneline`.
2. For CI claims, get the run URL: `gh run list --limit 5` then `gh run view <id> --json url,headSha,conclusion`.
3. Confirm the run's `headSha` equals the commit you cite. If it does not, the claim is about a different commit: fix the line.
4. Record what you observed, not what you expect. Red runs are recorded as red.
5. Mark anything you did not run as `NOT RUN`.

## Reject
- "Tests pass" with no SHA or run.
- A SHA from a different branch than the run.
- Words like "should", "probably", "looks fine".
