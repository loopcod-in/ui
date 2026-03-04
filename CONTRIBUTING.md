# Contributing to @loopcod/ui

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 9+

### Getting Started

1. Fork and clone the repository:
```bash
git clone https://github.com/loopcod/ui.git
cd ui
```

2. Install dependencies:
```bash
pnpm install
```

3. Build the CLI:
```bash
pnpm --filter @loopcod/ui build
```

4. Run CLI locally:
```bash
node packages/cli/dist/index.js --help
```

## Project Structure

```
packages/
├── cli/              # CLI tool
│   ├── src/
│   │   ├── commands/ # CLI commands (init, add, etc.)
│   │   └── utils/    # Utility functions
│   └── package.json
├── registry/         # Component registry
│   └── components/
│       ├── ui/       # UI primitives
│       ├── auth/     # Auth components
│       ├── dashboard/# Dashboard components
│       ├── billing/  # Billing components
│       └── marketing/# Marketing sections
└── ui/               # Core UI package
```

## Adding a New Component

1. Create component file in appropriate category:
```
packages/registry/components/ui/my-component.tsx
```

2. Follow component conventions:
- Use TypeScript
- Forward refs
- Support className overrides
- Use `cn()` for class merging
- Document props with JSDoc

3. Example component structure:
```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary"
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "base-styles",
          variant === "primary" && "primary-styles",
          className
        )}
        {...props}
      />
    )
  }
)
MyComponent.displayName = "MyComponent"
```

4. Register component in CLI:
   - Add to `packages/cli/src/commands/add.ts` availableComponents array

5. Test your component:
```bash
# Build CLI
pnpm --filter @loopcod/ui build

# Test in a Next.js project
node packages/cli/dist/index.js add my-component
```

## Submitting Changes

1. Create a new branch:
```bash
git checkout -b feat/my-feature
```

2. Make your changes and commit:
```bash
git add .
git commit -m "feat: add my-component"
```

3. Push and create a PR:
```bash
git push origin feat/my-feature
```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tool changes

## Code Style

- Use TypeScript
- Use functional components with hooks
- Follow existing code patterns
- Add JSDoc for public APIs

## Testing

Run tests before submitting:
```bash
pnpm test
```

## Questions?

- Open an [issue](https://github.com/loopcod/ui/issues)
- Join our [Discord](https://discord.gg/loopcod)

Thank you for contributing! 🎉
