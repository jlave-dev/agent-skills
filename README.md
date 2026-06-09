# Agent Skills

[![Release](https://github.com/jlave-dev/agent-skills/actions/workflows/release.yml/badge.svg)](https://github.com/jlave-dev/agent-skills/releases)

A collection of installable agent skills plus a repo-local Codex plugin marketplace.

## Installation

### Vercel Skills CLI

Install skills using the Vercel Skills CLI:

```bash
# Install all skills
npx skills add jlave-dev/agent-skills

# List available skills first
npx skills add jlave-dev/agent-skills --list

# Install specific skill
npx skills add jlave-dev/agent-skills --skill amazon-shopping

# Install globally
npx skills add jlave-dev/agent-skills -g
```

### Codex Plugin Marketplace

This repo also exposes a Codex marketplace at:

```bash
.agents/plugins/marketplace.json
```

From a local checkout, add the marketplace root to Codex:

```bash
codex plugin marketplace add /path/to/agent-skills
```

After the changes are pushed, Codex can also add it from GitHub:

```bash
codex plugin marketplace add jlave-dev/agent-skills
```

The marketplace currently provides:

- `subtractive-ui`: frontend design, rendered UI audit, and behavior-preserving UI refactor skills.

## Available Skills

### Amazon Shopping
Search Amazon.com, extract product data, and present ranked recommendations.

## Available Plugins

### Subtractive UI
Minimal, reference-led frontend critique for designing, auditing, and refactoring product UI.

Included Codex skills:

- `design-frontend`: design frontend screens from specs, screenshots, and visual references.
- `audit-rendered-ui`: review real rendered UI for leaky copy, redundancy, layout issues, and handoff polish.
- `refactor-ui`: remove UI clutter and implementation-detail copy while preserving behavior.

## Releases

This project uses automated semantic versioning powered by [semantic-release](https://github.com/semantic-release/semantic-release). Every merge to `main` is evaluated automatically and, when commits require it, semantic-release creates:
- a version bump in `package.json`
- a Git tag (`vX.Y.Z`)
- a GitHub Release with generated notes

See [Releases](https://github.com/jlave-dev/agent-skills/releases) for the full changelog.

## Development

### Commit Conventions

This project follows [Conventional Commits](https://www.conventionalcommits.org/) to drive automated releases:

```
<type>[optional scope]: <description>
```

| Type | Bump | Description |
|------|------|-------------|
| `feat` | MINOR | New skill or feature |
| `fix` | PATCH | Bug fix |
| `docs` | PATCH | Documentation changes |
| `chore` | PATCH | Maintenance tasks |

**Examples:**
```bash
feat: add github-actions skill
feat(amazon-shopping): add wishlist integration
fix(amazon-shopping): handle empty search results
docs: update README with installation guide
```

### Project Structure

Standalone skills are organized in `skills/` following the [Agent Skills Specification](https://agentskills.io). Codex plugins live under `plugins/` and are exposed through `.agents/plugins/marketplace.json`.

```
agent-skills/
├── .agents/
│   └── plugins/
│       └── marketplace.json     # Codex plugin marketplace
├── plugins/          # Codex plugin implementations
│   └── subtractive-ui/
│       ├── .codex-plugin/
│       │   └── plugin.json
│       └── skills/
├── skills/           # Individual skill implementations
│   └── <skill-name>/
│       ├── SKILL.md          # Skill definition
│       ├── evaluations.json  # Test definitions
│       ├── reference/        # Reference docs
│       └── scripts/          # Optional implementation scripts
├── .github/          # GitHub configuration
│   └── workflows/            # CI/CD
├── .releaserc.json   # semantic-release configuration
├── CHANGELOG.md      # Auto-generated changelog
└── package.json      # Repository version tracking
```

## License

MIT
