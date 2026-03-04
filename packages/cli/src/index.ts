#!/usr/bin/env node

import { Command } from "commander";
import { add } from "./commands/add.js";
import { init } from "./commands/init.js";
import { diff } from "./commands/diff.js";
import { info } from "./commands/info.js";
import { update } from "./commands/update.js";
import { getPackageInfo } from "./utils/get-package-info.js";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const packageInfo = getPackageInfo();

  const program = new Command()
    .name("loopcod")
    .description("SaaS-focused UI components for React")
    .version(
      packageInfo.version || "0.1.0",
      "-v, --version",
      "display the version number"
    );

  program
    .addCommand(init)
    .addCommand(add)
    .addCommand(diff)
    .addCommand(info)
    .addCommand(update);

  program.parse();
}

main();
