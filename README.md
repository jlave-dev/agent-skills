# Agent Skills

A collection of installable agent skills compatible with the Vercel Skills CLI.

## Installation

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

## Available Skills

### Amazon Shopping
Search Amazon.com, extract product data, and present ranked recommendations.

## Development

Skills are organized in the `skills/` directory following the [Agent Skills Specification](https://github.com/vercel-labs/skills).

## License

MIT
