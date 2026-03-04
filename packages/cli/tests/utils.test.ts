import { describe, it, expect } from "vitest";
import { getPackageManagerCommand } from "../src/utils/get-package-manager.js";

describe("getPackageManagerCommand", () => {
  it("returns correct npm commands", () => {
    const cmds = getPackageManagerCommand("npm");
    expect(cmds.add).toBe("install");
    expect(cmds.addDev).toBe("install -D");
    expect(cmds.run).toBe("run");
  });

  it("returns correct pnpm commands", () => {
    const cmds = getPackageManagerCommand("pnpm");
    expect(cmds.add).toBe("add");
    expect(cmds.addDev).toBe("add -D");
    expect(cmds.run).toBe("run");
  });

  it("returns correct yarn commands", () => {
    const cmds = getPackageManagerCommand("yarn");
    expect(cmds.add).toBe("add");
    expect(cmds.addDev).toBe("add -D");
    expect(cmds.run).toBe("");
  });

  it("returns correct bun commands", () => {
    const cmds = getPackageManagerCommand("bun");
    expect(cmds.add).toBe("add");
    expect(cmds.addDev).toBe("add -D");
    expect(cmds.run).toBe("run");
  });
});
