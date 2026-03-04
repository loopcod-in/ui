import { z } from "zod";

export const templateSchema = z.enum([
  "saas-starter",
  "dashboard",
  "landing-page",
  "auth-only",
]);

export type Template = z.infer<typeof templateSchema>;

export const templates: Record<Template, {
  name: string;
  description: string;
  components: string[];
}> = {
  "saas-starter": {
    name: "SaaS Starter",
    description: "Complete SaaS application with auth, billing, and dashboard",
    components: [
      "auth/login-form",
      "auth/signup-form",
      "auth/forgot-password",
      "billing/pricing-table",
      "billing/checkout-form",
      "dashboard/shell",
      "dashboard/stats-cards",
      "dashboard/data-table",
      "dashboard/nav",
      "ui/button",
      "ui/card",
      "ui/input",
      "ui/label",
      "ui/avatar",
      "ui/dropdown-menu",
      "ui/sheet",
      "ui/toast",
    ],
  },
  dashboard: {
    name: "Admin Dashboard",
    description: "Internal tools and admin panel components",
    components: [
      "dashboard/shell",
      "dashboard/stats-cards",
      "dashboard/data-table",
      "dashboard/filters",
      "dashboard/date-range-picker",
      "ui/table",
      "ui/pagination",
      "ui/tabs",
      "ui/badge",
      "ui/skeleton",
    ],
  },
  "landing-page": {
    name: "Marketing Site",
    description: "Landing page sections and marketing components",
    components: [
      "marketing/hero",
      "marketing/features",
      "marketing/pricing",
      "marketing/testimonials",
      "marketing/cta",
      "marketing/footer",
      "ui/button",
      "ui/card",
      "ui/badge",
    ],
  },
  "auth-only": {
    name: "Auth Only",
    description: "Just authentication flows",
    components: [
      "auth/login-form",
      "auth/signup-form",
      "auth/forgot-password",
      "auth/reset-password",
      "auth/oauth-buttons",
      "ui/button",
      "ui/input",
      "ui/label",
      "ui/card",
      "ui/separator",
    ],
  },
};

export function getTemplate(name: Template) {
  return templates[name];
}

export function listTemplates() {
  return Object.entries(templates).map(([key, value]) => ({
    value: key as Template,
    title: value.name,
    description: value.description,
  }));
}
