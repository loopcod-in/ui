# @loopcod/ui

> **SaaS-focused UI components for React.**

The CLI tool for installing production-ready SaaS components in your Next.js applications.

## 🚀 Quick Start

```bash
npx @loopcod/ui@latest init
```

## ✨ Features

- **🧩 UI Primitives** - Button, Card, Input, and more
- **🔐 Auth Components** - Login forms, signup, password reset
- **📊 Dashboard** - Shell, stats cards, data tables
- **💳 Billing** - Pricing tables, checkout forms
- **🎨 Marketing** - Hero sections, features, testimonials

## 📦 Installation

### Initialize a new project

```bash
npx @loopcod/ui@latest init
```

### Add components

```bash
# Add specific components
npx @loopcod/ui@latest add button login-form

# Add all components
npx @loopcod/ui@latest add --all

# Interactive picker
npx @loopcod/ui@latest add
```

### Use templates

```bash
# SaaS starter template
npx @loopcod/ui@latest init --template saas-starter

# Admin dashboard
npx @loopcod/ui@latest init --template dashboard

# Landing page
npx @loopcod/ui@latest init --template landing-page
```

## 🛠️ CLI Commands

| Command | Description |
|---------|-------------|
| `init` | Initialize your project |
| `add [components]` | Add components to your project |
| `diff` | Check for component updates |
| `update [components]` | Update components to latest version |
| `info <component>` | Show component information |

## 📚 Documentation

Visit [https://ui.loopcod.in](https://ui.loopcod.in) for full documentation.

## 🎨 Example

```tsx
import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/auth/login-form"

export default function Page() {
  return (
    <div>
      <LoginForm />
    </div>
  )
}
```

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](https://github.com/loopcod/ui/blob/main/CONTRIBUTING.md).

## 📝 License

MIT © [Loopcod](https://loopcod.in)
