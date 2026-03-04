import { detect } from "@antfu/ni";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export async function getPackageManager(
  targetDir = process.cwd()
): Promise<PackageManager> {
  const packageManager = await detect({ programmatic: true, cwd: targetDir });

  if (packageManager === "yarn@berry") return "yarn";
  if (packageManager === "pnpm@6") return "pnpm";
  if (packageManager === "bun") return "bun";
  if (packageManager === "npm") return "npm";
  if (packageManager === "pnpm") return "pnpm";
  if (packageManager === "yarn") return "yarn";

  return "npm";
}

export function getPackageManagerCommand(packageManager: PackageManager) {
  const commands: Record<PackageManager, { add: string; addDev: string; run: string }> = {
    npm: { add: "install", addDev: "install -D", run: "run" },
    pnpm: { add: "add", addDev: "add -D", run: "run" },
    yarn: { add: "add", addDev: "add -D", run: "" },
    bun: { add: "add", addDev: "add -D", run: "run" },
  };
  return commands[packageManager];
}
