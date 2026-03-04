import { Command } from "commander";
import ora from "ora";
import path from "path";
import fs from "fs-extra";
import { fetchRegistry } from "../utils/registry.js";
import { logger } from "../utils/logger.js";

export const update = new Command()
  .name("update")
  .description("update components to latest version")
  .argument("[components...]", "the components to update")
  .option("-a, --all", "update all components", false)
  .action(async (components, opts) => {
    const cwd = process.cwd();
    const componentsDir = path.join(cwd, "components");

    if (!await fs.pathExists(componentsDir)) {
      logger.error("No components directory found.");
      process.exit(1);
    }

    let toUpdate = components;
    
    if (opts.all || components.length === 0) {
      toUpdate = await getInstalledComponents(componentsDir);
    }

    logger.break();
    logger.info(`Updating ${toUpdate.length} component(s)...`);
    logger.break();

    for (const name of toUpdate) {
      const spinner = ora(`Updating ${name}...`).start();
      
      const registryComponent = await fetchRegistry(name);
      if (!registryComponent) {
        spinner.fail(`${name}: Not found in registry`);
        continue;
      }

      try {
        const targetPath = path.join(componentsDir, registryComponent.category);
        await fs.ensureDir(targetPath);

        for (const file of registryComponent.files) {
          const filePath = path.join(targetPath, file.name);
          await fs.writeFile(filePath, file.content);
        }

        spinner.succeed(`${name}`);
      } catch (error) {
        spinner.fail(`${name}: Update failed`);
      }
    }

    logger.break();
    logger.success("Components updated successfully!");
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
