import { Command } from "commander";
import chalk from "chalk";
import { execa } from "execa";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import prompts from "prompts";
import { z } from "zod";
import { logger } from "../utils/logger.js";
import { listTemplates, templateSchema, type Template } from "../utils/templates.js";
import { getPackageManager } from "../utils/get-package-manager.js";

const initOptionsSchema = z.object({
  yes: z.boolean(),
  template: z.string().optional(),
  baseColor: z.enum(["slate", "gray", "zinc", "neutral", "stone"]).default("slate"),
  cssVariables: z.boolean().default(true),
});

type InitOptions = z.infer<typeof initOptionsSchema>;

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option("-t, --template <template>", "the template to use.")
  .option("-b, --base-color <color>", "the base color to use.", "slate")
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse({
        yes: opts.yes,
        template: opts.template,
        baseColor: opts.baseColor,
      });

      const cwd = process.cwd();
      const packageManager = getPackageManager();

      // Check if project exists
      const exists = await fs.pathExists(path.join(cwd, "package.json"));
      if (!exists) {
        logger.error("No package.json found. Please run this in a Next.js project.");
        process.exit(1);
      }

      // Show welcome
      logger.break();
      console.log(chalk.bold.blue("🚀 Loopcod UI"));
      console.log(chalk.gray("SaaS-focused components for React\n"));

      // Get template selection
      let template: Template = "saas-starter";
      if (!options.yes) {
        const { selectedTemplate } = await prompts({
          type: "select",
          name: "selectedTemplate",
          message: "Which template would you like to use?",
          choices: listTemplates(),
          initial: 0,
        });
        template = selectedTemplate;
      } else if (options.template) {
        template = templateSchema.parse(options.template);
      }

      // Initialize project
      const spinner = ora("Initializing project...").start();
      
      // Create components.json config
      await createComponentsConfig(cwd, options);
      
      // Create directories
      await fs.ensureDir(path.join(cwd, "components/ui"));
      await fs.ensureDir(path.join(cwd, "app/(auth)"));
      await fs.ensureDir(path.join(cwd, "app/(dashboard)"));
      await fs.ensureDir(path.join(cwd, "lib"));

      spinner.succeed("Project initialized");

      // Install dependencies
      const depsSpinner = ora("Installing dependencies...").start();
      await installDependencies(packageManager, cwd);
      depsSpinner.succeed("Dependencies installed");

      // Add components based on template
      const addSpinner = ora(`Adding ${template} components...`).start();
      await addTemplateComponents(template, cwd);
      addSpinner.succeed("Components added");

      // Success message
      logger.break();
      logger.success("✨ Project initialized successfully!");
      logger.break();
      console.log("Next steps:");
      console.log(chalk.cyan("  1."), "Update your Tailwind config:");
      console.log(chalk.gray("     npx tailwindcss init -p"));
      console.log(chalk.cyan("  2."), "Add your environment variables");
      console.log(chalk.cyan("  3."), "Run your dev server:");
      console.log(chalk.gray("     npm run dev"));
      logger.break();
      console.log(chalk.gray("Documentation: https://ui.loopcod.in"));
      console.log(chalk.gray("Need help? https://github.com/loopcod/ui/issues"));
      logger.break();

    } catch (error) {
      logger.error("Something went wrong. Please try again.");
      console.error(error);
      process.exit(1);
    }
  });

async function createComponentsConfig(cwd: string, options: InitOptions) {
  const componentsJson = {
    "$schema": "https://ui.loopcod.in/schema.json",
    "style": "default",
    "rsc": true,
    "tsx": true,
    "tailwind": {
      "config": "tailwind.config.ts",
      "css": "app/globals.css",
      "baseColor": options.baseColor,
      "cssVariables": options.cssVariables,
      "prefix": ""
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils",
      "ui": "@/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
    }
  };

  await fs.writeJSON(path.join(cwd, "components.json"), componentsJson, { spaces: 2 });
}

async function installDependencies(packageManager: string, cwd: string) {
  const deps = [
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "lucide-react",
    "@radix-ui/react-slot",
    "@radix-ui/react-dialog",
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-label",
    "@radix-ui/react-separator",
    "@radix-ui/react-tabs",
    "@radix-ui/react-toast",
    "@radix-ui/react-avatar",
    "@hookform/resolvers",
    "react-hook-form",
    "zod",
  ];

  await execa(packageManager, ["add", ...deps], { cwd });
}

async function addTemplateComponents(template: Template, cwd: string) {
  // This would fetch components from the registry
  // For now, we'll create placeholder files
  const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
  await fs.writeFile(path.join(cwd, "lib/utils.ts"), utilsContent);
}
