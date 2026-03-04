# 🚀 @loopcod/ui

> **SaaS-focused UI components for React.** The component library for building production-ready SaaS applications.

[![npm version](https://img.shields.io/npm/v/@loopcod/ui.svg)](https://www.npmjs.com/package/@loopcod/ui)
[![GitHub stars](https://img.shields.io/github/stars/loopcod/ui.svg)](https://github.com/loopcod/ui)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Why @loopcod/ui?

Building a SaaS? Stop assembling primitives. Start shipping features.

| Feature | shadcn/ui | @loopcod/ui |
|---------|-----------|-------------|
| Base Components | ✅ | ✅ |
| SaaS Templates | ❌ | ✅ |
| Auth Flows | ❌ | ✅ |
| Billing Components | ❌ | ✅ |
| Dashboard Shell | ❌ | ✅ |
| Marketing Sections | ❌ | ✅ |

**@loopcod/ui** provides complete, production-ready SaaS building blocks—not just UI primitives.

## 🎯 What's Included

### 🧩 UI Primitives
- Button, Card, Input, Label, Badge, Avatar
- Dialog, Sheet, Dropdown Menu, Toast
- Table, Tabs, Pagination
- Checkbox, Radio, Switch, Select

### 🔐 Auth Components
- Login Form (with validation)
- Signup Form
- Forgot/Reset Password
- OAuth Buttons

### 📊 Dashboard Components
- Dashboard Shell (with sidebar)
- Stats Cards (with trend indicators)
- Data Table (sorting, filtering)
- Date Range Picker

### 💳 Billing Components
- Pricing Tables
- Checkout Forms
- Subscription Manager

### 🎨 Marketing Sections
- Hero Sections
- Feature Grids
- Testimonials
- CTAs
- Footers

## 🚀 Quick Start

### 1. Initialize your project

```bash
npx @loopcod/ui@latest init
```

### 2. Add components

```bash
# Add specific components
npx @loopcod/ui@latest add button card login-form

# Or add everything
npx @loopcod/ui@latest add --all

# Use the interactive picker
npx @loopcod/ui@latest add
```

### 3. Use in your app

```tsx
import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/auth/login-form"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoginForm />
    </div>
  )
}
```

## 📦 Templates

### SaaS Starter
Complete SaaS template with auth, billing, and dashboard:

```bash
npx @loopcod/ui@latest init --template saas-starter
```

Includes:
- Authentication pages (login, signup, forgot password)
- Dashboard with navigation
- Pricing page
- Settings pages
- Stripe integration ready

### Admin Dashboard
Internal tools and admin panel:

```bash
npx @loopcod/ui@latest init --template dashboard
```

### Landing Page
Marketing site with all sections:

```bash
npx @loopcod/ui@latest init --template landing-page
```

## 🎨 Theming

@loopcod/ui uses CSS variables for theming. Customize your colors in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}
```

## 🛠️ CLI Commands

| Command | Description |
|---------|-------------|
| `init` | Initialize project and install dependencies |
| `add [components]` | Add components to your project |
| `diff` | Check for component updates |
| `update [components]` | Update components to latest version |
| `info <component>` | Show component information |

## 📚 Documentation

Visit [https://ui.loopcod.in](https://ui.loopcod.in) for:
- Full component documentation
- Live examples
- Theming guide
- API references

## 🏗️ Project Structure

```
├── packages/
│   ├── cli/          # CLI tool (npx @loopcod/ui)
│   ├── registry/     # Component registry
│   └── ui/           # Core UI package
├── templates/
│   └── nextjs-saas/  # SaaS starter template
└── docs/             # Documentation site
```

## 🤝 Contributing

We love contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development

```bash
# Clone the repo
git clone https://github.com/loopcod/ui.git
cd ui

# Install dependencies
pnpm install

# Run CLI in dev mode
pnpm --filter @loopcod/ui dev

# Test CLI locally
node packages/cli/dist/index.js init
```

## 📝 License

MIT © [Loopcod](https://loopcod.in)

## 🙏 Credits

- Built with [Radix UI](https://radix-ui.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Inspired by [shadcn/ui](https://ui.shadcn.com)

---

<p align="center">
  Built with ❤️ by <a href="https://loopcod.in">Loopcod</a>
</p>
