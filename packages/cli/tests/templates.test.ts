import { describe, it, expect } from "vitest";
import { getTemplate, listTemplates, templates } from "../src/utils/templates.js";

describe("templates", () => {
  describe("getTemplate", () => {
    it("returns saas-starter template", () => {
      const template = getTemplate("saas-starter");
      expect(template).toBeDefined();
      expect(template.name).toBe("SaaS Starter");
      expect(template.components.length).toBeGreaterThan(0);
    });

    it("returns dashboard template", () => {
      const template = getTemplate("dashboard");
      expect(template).toBeDefined();
      expect(template.name).toBe("Admin Dashboard");
    });

    it("returns landing-page template", () => {
      const template = getTemplate("landing-page");
      expect(template).toBeDefined();
      expect(template.name).toBe("Marketing Site");
    });

    it("returns auth-only template", () => {
      const template = getTemplate("auth-only");
      expect(template).toBeDefined();
      expect(template.name).toBe("Auth Only");
    });
  });

  describe("listTemplates", () => {
    it("returns all templates as choices", () => {
      const choices = listTemplates();
      expect(choices).toHaveLength(4);
      expect(choices[0]).toHaveProperty("value");
      expect(choices[0]).toHaveProperty("title");
      expect(choices[0]).toHaveProperty("description");
    });

    it("includes saas-starter as first option", () => {
      const choices = listTemplates();
      expect(choices[0].value).toBe("saas-starter");
    });
  });

  describe("template components", () => {
    it("saas-starter includes auth components", () => {
      const template = templates["saas-starter"];
      expect(template.components.some(c => c.startsWith("auth/"))).toBe(true);
    });

    it("saas-starter includes billing components", () => {
      const template = templates["saas-starter"];
      expect(template.components.some(c => c.startsWith("billing/"))).toBe(true);
    });

    it("saas-starter includes dashboard components", () => {
      const template = templates["saas-starter"];
      expect(template.components.some(c => c.startsWith("dashboard/"))).toBe(true);
    });
  });
});
