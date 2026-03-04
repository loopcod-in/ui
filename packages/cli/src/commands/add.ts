import { Command } from "commander";
import chalk from "chalk";
import { execa } from "execa";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import prompts from "prompts";
import { z } from "zod";
import { logger } from "../utils/logger.js";
import { fetchRegistry } from "../utils/registry.js";
import { getPackageManager } from "../utils/get-package-manager.js";

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  overwrite: z.boolean(),
  path: z.string().optional(),
  all: z.boolean(),
});

type AddOptions = z.infer<typeof addOptionsSchema>;

// List of available components
const availableComponents = [
  // UI Primitives
  { name: "button", category: "ui", description: "Interactive button with variants" },
  { name: "card", category: "ui", description: "Card container with header, content, footer" },
  { name: "input", category: "ui", description: "Form input with label and error" },
  { name: "label", category: "ui", description: "Form label component" },
  { name: "textarea", category: "ui", description: "Multi-line text input" },
  { name: "select", category: "ui", description: "Dropdown select component" },
  { name: "checkbox", category: "ui", description: "Checkbox with label" },
  { name: "radio-group", category: "ui", description: "Radio button group" },
  { name: "switch", category: "ui", description: "Toggle switch" },
  { name: "badge", category: "ui", description: "Status badge with variants" },
  { name: "avatar", category: "ui", description: "User avatar with fallback" },
  { name: "separator", category: "ui", description: "Visual divider" },
  { name: "skeleton", category: "ui", description: "Loading placeholder" },
  { name: "table", category: "ui", description: "Data table with sorting" },
  { name: "pagination", category: "ui", description: "Page navigation" },
  { name: "tabs", category: "ui", description: "Tabbed interface" },
  { name: "dialog", category: "ui", description: "Modal dialog" },
  { name: "sheet", category: "ui", description: "Slide-out panel" },
  { name: "dropdown-menu", category: "ui", description: "Context menu" },
  { name: "toast", category: "ui", description: "Notification toast" },
  { name: "tooltip", category: "ui", description: "Hover tooltip" },
  { name: "popover", category: "ui", description: "Floating content panel" },
  
  // Auth Components
  { name: "login-form", category: "auth", description: "Complete login form with validation" },
  { name: "signup-form", category: "auth", description: "User registration form" },
  { name: "forgot-password", category: "auth", description: "Password reset request form" },
  { name: "reset-password", category: "auth", description: "Password reset confirmation" },
  { name: "oauth-buttons", category: "auth", description: "Social login buttons" },
  
  // Dashboard Components
  { name: "shell", category: "dashboard", description: "Dashboard layout with sidebar" },
  { name: "nav", category: "dashboard", description: "Navigation with mobile menu" },
  { name: "stats-cards", category: "dashboard", description: "Metric display cards" },
  { name: "data-table", category: "dashboard", description: "Advanced data table with filters" },
  { name: "filters", category: "dashboard", description: "Search and filter controls" },
  { name: "date-range-picker", category: "dashboard", description: "Date range selector" },
  { name: "chart", category: "dashboard", description: "Chart wrapper with themes" },
  
  // Billing Components
  { name: "pricing-table", category: "billing", description: "Pricing plan comparison" },
  { name: "checkout-form", category: "billing", description: "Payment collection form" },
  { name: "subscription-manager", category: "billing", description: "Manage subscriptions" },
  
  // Marketing Components
  { name: "hero", category: "marketing", description: "Hero section with CTA" },
  { name: "features", category: "marketing", description: "Feature grid section" },
  { name: "pricing", category: "marketing", description: "Pricing section" },
  { name: "testimonials", category: "marketing", description: "Customer testimonials" },
  { name: "cta", category: "marketing", description: "Call-to-action section" },
  { name: "footer", category: "marketing", description: "Site footer" },
];

export const add = new Command()
  .name("add")
  .description("add a component to your project")
  .argument("[components...]", "the components to add")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option("-p, --path <path>", "the path to add the component to.")
  .option("-a, --all", "add all available components", false)
  .action(async (components, opts) => {
    try {
      const options: AddOptions = addOptionsSchema.parse({
        components,
        yes: opts.yes,
        overwrite: opts.overwrite,
        path: opts.path,
        all: opts.all,
      });

      const cwd = process.cwd();
      const packageManager = await getPackageManager();

      // If no components specified and not --all, show interactive picker
      let selectedComponents: string[] = [];
      
      if (options.all) {
        selectedComponents = availableComponents.map(c => c.name);
      } else if (!options.components || options.components.length === 0) {
        const { components: picked } = await prompts({
          type: "multiselect",
          name: "components",
          message: "Which components would you like to add?",
          hint: "Space to select, Enter to confirm",
          instructions: false,
          choices: availableComponents.map(c => ({
            title: `${c.category}/${c.name}`,
            value: c.name,
            description: c.description,
          })),
        });
        
        if (!picked || picked.length === 0) {
          logger.warn("No components selected.");
          process.exit(0);
        }
        selectedComponents = picked;
      } else {
        selectedComponents = options.components;
      }

      logger.break();
      logger.info(`Adding ${selectedComponents.length} component(s)...`);
      logger.break();

      // Track dependencies to install
      const dependencies = new Set<string>();

      for (const componentName of selectedComponents) {
        const spinner = ora(`Adding ${componentName}...`).start();
        
        try {
          // Fetch component from registry
          const component = await fetchRegistry(componentName);
          
          if (!component) {
            spinner.fail(`Component ${componentName} not found`);
            continue;
          }

          // Determine target path
          const targetPath = options.path 
            ? path.join(cwd, options.path)
            : path.join(cwd, "components", component.category);

          await fs.ensureDir(targetPath);

          // Write component files
          for (const file of component.files) {
            const filePath = path.join(targetPath, file.name);
            
            if (await fs.pathExists(filePath) && !options.overwrite) {
              spinner.warn(`${file.name} already exists. Use --overwrite to replace.`);
              continue;
            }

            await fs.writeFile(filePath, file.content);
          }

          // Collect dependencies
          component.dependencies?.forEach((dep: string) => dependencies.add(dep));
          component.devDependencies?.forEach((dep: string) => dependencies.add(dep));

          spinner.succeed(`${componentName}`);
        } catch (error) {
          spinner.fail(`Failed to add ${componentName}`);
          console.error(error);
        }
      }

      // Install dependencies if any
      if (dependencies.size > 0) {
        const depsSpinner = ora("Installing dependencies...").start();
        await execa(packageManager, ["add", ...Array.from(dependencies)], { cwd });
        depsSpinner.succeed("Dependencies installed");
      }

      logger.break();
      logger.success("Components added successfully!");
      logger.break();
      
      if (selectedComponents.length > 0) {
        console.log("Added components:");
        selectedComponents.forEach(name => {
          console.log(chalk.cyan(`  ✓`), name);
        });
      }

    } catch (error) {
      logger.error("Something went wrong.");
      console.error(error);
      process.exit(1);
    }
  });
