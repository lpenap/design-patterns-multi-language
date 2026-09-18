import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export const SNAPSHOTS_DIR = "snapshots";

export function snapshotPath(root: string, pattern: string, language: string): string {
  return join(root, SNAPSHOTS_DIR, pattern, `${language}.txt`);
}

export function readSnapshot(root: string, pattern: string, language: string): string | null {
  const path = snapshotPath(root, pattern, language);
  return existsSync(path) ? readFileSync(path, "utf8") : null;
}

export function writeSnapshot(root: string, pattern: string, language: string, content: string): void {
  const path = snapshotPath(root, pattern, language);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}
