import { existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");
const distDir = join(rootDir, "dist");

if (!existsSync(distDir)) {
  console.error("Build output not found. Run `npm run build` before packaging.");
  process.exit(1);
}

const deployDir = join(rootDir, "deploy");
if (!existsSync(deployDir)) {
  mkdirSync(deployDir, { recursive: true });
}

const timestamp = new Date()
  .toISOString()
  .replace(/[:T]/g, "-")
  .replace(/\..+/, "");
const packageName = `conversa-mestre-${timestamp}.tar.gz`;
const outputPath = join(deployDir, packageName);

if (existsSync(outputPath)) {
  rmSync(outputPath);
}

const result = spawnSync("tar", ["-czf", outputPath, "-C", distDir, "."], { stdio: "inherit" });

if (result.error) {
  console.error("Failed to run tar command:", result.error);
  process.exit(1);
}

if (result.status !== 0) {
  console.error(`tar process exited with code ${result.status}`);
  process.exit(result.status ?? 1);
}

const { size } = statSync(outputPath);
const sizeInMb = (size / (1024 * 1024)).toFixed(2);
console.log(`Deploy package created: ${packageName} (${sizeInMb} MB)`);
