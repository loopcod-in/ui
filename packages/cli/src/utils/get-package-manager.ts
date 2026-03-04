import { detect } from "@antfu/ni";

export async function getPackageManager(
  targetDir = process.cwd()
): Promise<"npm" | "pnpm" | "yarn" | "bun"> {
  const packageManager = await detect({ programmatic: true, cwd: targetDir });

  if (packageManager === "yarn@berry") return "yarn";
  if (packageManager === "pnpm@6") return "pnpm";
  if (packageManager === "bun") return "bun";

  return packageManager ?? "npm";
}

export function getPackageManagerCommand(
  packageManager: "npm" | "pnpm" | "yarn" | "bun"
) {
  const commands: Record<string, { add: string; addDev: string; run: string }> = {
    npm: { add: "install", addDev: "install -D", run: "run" },
    pnpm: { add: "add", addDev: "add -D", run: "run" },
    yarn: { add: "add", addDev: "add -D", run: "" },
    bun: { add: "add", addDev: "add -D", run: "run" },
  };
  return commands[packageManager];
}
