import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getPackageInfo() {
  const packageJsonPath = path.resolve(__dirname, "../package.json");
  return fs.readJSONSync(packageJsonPath);
}
