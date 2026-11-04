# house-workflow

Small TypeScript library used to practise a verifiable Claude Code workflow.

## Commands
- `npm run typecheck` — `tsc --noEmit`, strict. Must pass before every commit.
- `npm test` — node test runner via tsx. Green tests are necessary, not sufficient.

## Conventions
- Strict TypeScript, no `any`, no `@ts-ignore`. Fix the type instead.
- Imports of local files use the `.js` extension (NodeNext resolution).
- Source in `src/`, one test file per module: `src/<name>.test.ts`.
- Small commits, one concern each. Imperative subject line.

## Verification rules
- Never say "works" or "fixed" without naming the command you ran and its result.
- Passing tests do not prove the code is right: read the diff against the stated requirement, and check edge cases the tests do not cover.
- Every claim in `VERIFICATION.md` names a commit SHA or a GitHub Actions run URL.

## Guardrails
- A PreToolUse hook (`.claude/hooks/block-commit-on-typecheck-fail.mjs`) blocks `git commit` when typecheck fails. Do not bypass it with `--no-verify` or by editing the hook.
- Use the `code-reviewer` agent for review; it is read-only and must not edit files.
- Use `/verify` before reporting a task done.
