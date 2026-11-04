# house-workflow

A small TypeScript repo demonstrating a verifiable Claude Code workflow:

| Piece | Location |
|---|---|
| Project memory | `CLAUDE.md` |
| Settings and permissions | `.claude/settings.json` |
| Review-only agent | `.claude/agents/code-reviewer.md` |
| Skill | `.claude/skills/verify-claims/SKILL.md` |
| Slash command | `.claude/commands/verify.md` |
| PreToolUse hook (blocks `git commit` if typecheck fails) | `.claude/hooks/block-commit-on-typecheck-fail.mjs` |
| CI (typecheck + tests) | `.github/workflows/ci.yml` |
| Claims with evidence | `VERIFICATION.md` |

```bash
npm ci
npm run typecheck
npm test
```
