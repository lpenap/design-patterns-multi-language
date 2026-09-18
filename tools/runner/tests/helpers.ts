import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { type Catalog, loadCatalog } from "../src/catalog.ts";
import type { Context, Io } from "../src/context.ts";

const FIXTURES = join(dirname(fileURLToPath(import.meta.url)), "fixtures");

export interface Repo {
  readonly root: string;
  readonly catalog: Catalog;
  readonly ctx: Context;
  readonly out: () => string;
  readonly err: () => string;
  readonly reload: () => Context;
  readonly dispose: () => void;
}

interface Behaviour {
  examples: Record<string, string[]>;
  fail: string[];
}

/** A throwaway copy of the fixture repository with capturing streams. */
export function makeRepo(): Repo {
  const root = mkdtempSync(join(tmpdir(), "patterns-runner-"));
  cpSync(FIXTURES, root, { recursive: true });
  let out = "";
  let err = "";
  const io: Io = {
    write: (t) => {
      out += t;
    },
    error: (t) => {
      err += t;
    },
  };
  const load = (): Context => ({ root, catalog: loadCatalog(root, { allowFixtureIds: true }), io });
  const ctx = load();
  return {
    root,
    catalog: ctx.catalog,
    ctx,
    out: () => out,
    err: () => err,
    reload: load,
    dispose: () => {
      rmSync(root, { recursive: true, force: true });
    },
  };
}

export function setBehaviour(root: string, mutate: (b: Record<string, Behaviour>) => void): void {
  const path = join(root, "behaviour.json");
  const b = JSON.parse(readFileSync(path, "utf8")) as Record<string, Behaviour>;
  mutate(b);
  writeFileSync(path, JSON.stringify(b));
}

export function editCatalog(root: string, replace: (yaml: string) => string): void {
  const path = join(root, "catalog.yaml");
  writeFileSync(path, replace(readFileSync(path, "utf8")));
}

export function invocations(root: string): string {
  try {
    return readFileSync(join(root, "invocations.log"), "utf8");
  } catch {
    return "";
  }
}

export const ALPHA = "Executing Fixture Alpha Pattern Implementation\n  first\n  second\n";
