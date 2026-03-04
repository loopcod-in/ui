import { Command } from "commander";
import chalk from "chalk";
import { fetchRegistry } from "../utils/registry.js";
import { logger } from "../utils/logger.js";

export const info = new Command()
  .name("info")
  .description("show information about a component")
  .argument("<component>", "the component name")
  .action(async (componentName) => {
    const component = await fetchRegistry(componentName);

    if (!component) {
      logger.error(`Component ${componentName} not found.`);
      process.exit(1);
    }

    logger.break();
    console.log(chalk.bold.blue(component.name));
    console.log(chalk.gray(component.description));
    logger.break();

    console.log(chalk.bold("Category:"), component.category);
    
    if (component.dependencies?.length) {
      logger.break();
      console.log(chalk.bold("Dependencies:"));
      component.dependencies.forEach(dep => {
        console.log(chalk.gray(`  • ${dep}`));
      });
    }

    if (component.files?.length) {
      logger.break();
      console.log(chalk.bold("Files:"));
      component.files.forEach(file => {
        console.log(chalk.gray(`  • ${file.name}`));
      });
    }

    logger.break();
  });
