import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fetchRegistry } from "../utils/registry.js";
import { logger } from "../utils/logger.js";

export const diff = new Command()
  .name("diff")
  .description("check for updates to components")
  .argument("[component]", "the component to check")
  .action(async (componentName) => {
    const cwd = process.cwd();
    const componentsDir = path.join(cwd, "components");

    if (!await fs.pathExists(componentsDir)) {
      logger.error("No components directory found.");
      process.exit(1);
    }

    logger.break();
    logger.info("Checking for component updates...");
    logger.break();

    const components = componentName 
      ? [componentName]
      : await getInstalledComponents(componentsDir);

    for (const name of components) {
      const spinner = logger.info(`Checking ${name}...`);
      
      const registryComponent = await fetchRegistry(name);
      if (!registryComponent) {
        logger.warn(`Component ${name} not found in registry.`);
        continue;
      }

      // Compare versions/files
      const localPath = path.join(componentsDir, registryComponent.category, `${name}.tsx`);
      
      if (!await fs.pathExists(localPath)) {
        logger.warn(`${name}: Not installed locally`);
        continue;
      }

      const localContent = await fs.readFile(localPath, "utf-8");
      const registryContent = registryComponent.files[0]?.content;

      if (localContent !== registryContent) {
        console.log(chalk.yellow(`  ${name}: Update available`));
      } else {
        console.log(chalk.green(`  ${name}: Up to date`));
      }
    }

    logger.break();
  });

async function getInstalledComponents(componentsDir: string): Promise<string[]> {
  const components: string[] = [];
  const categories = await fs.readdir(componentsDir);

  for (const category of categories) {
    const categoryPath = path.join(componentsDir, category);
    const stat = await fs.stat(categoryPath);
    
    if (stat.isDirectory()) {
      const files = await fs.readdir(categoryPath);
      files
        .filter(f => f.endsWith(".tsx"))
        .forEach(f => components.push(f.replace(".tsx", "")));
    }
  }

  return components;
}
