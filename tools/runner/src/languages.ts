import { spawnSync } from "node:child_process";
import type { Language } from "./catalog.ts";

export type RunStatus = "ok" | "unknown-example" | "failed" | "toolchain-unavailable" | "not-implemented";

export interface RunResult {
  readonly pattern: string;
  readonly language: string;
  readonly status: RunStatus;
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number | null;
}

export interface ListResult {
  readonly language: string;
  readonly ids: readonly string[] | null;
  readonly error: string | null;
}

export const TIMEOUT_MS = 60_000;

/** Splits a catalog `run:` command on whitespace; no quoting is supported. */
export function splitCommand(run: string): readonly string[] {
  return run.trim().split(/\s+/);
}

interface Spawned {
  readonly exitCode: number | null;
  readonly stdout: string;
  readonly stderr: string;
  readonly spawnError: string | null;
}

function spawn(root: string, language: Language, args: readonly string[]): Spawned {
  const [cmd, ...base] = splitCommand(language.run);
  const result = spawnSync(cmd ?? "", [...base, ...args], {
    cwd: root,
    encoding: "utf8",
    timeout: TIMEOUT_MS,
    shell: false,
    stdio: "pipe",
  });
  return {
    exitCode: result.status,
    stdout: result.stdout,
    stderr: result.stderr,
    spawnError: result.error ? result.error.message : null,
  };
}

export function listExamples(root: string, language: Language): ListResult {
  const r = spawn(root, language, ["list"]);
  if (r.spawnError !== null) {
    return { language: language.id, ids: null, error: `toolchain unavailable: ${r.spawnError}` };
  }
  if (r.exitCode !== 0) {
    return { language: language.id, ids: null, error: `list failed (exit ${String(r.exitCode)}): ${r.stderr.trim()}` };
  }
  try {
    const parsed: unknown = JSON.parse(r.stdout);
    if (!Array.isArray(parsed) || !parsed.every((x) => typeof x === "string")) {
      throw new TypeError("not a string array");
    }
    return { language: language.id, ids: parsed as string[], error: null };
  } catch (e) {
    return { language: language.id, ids: null, error: `list printed invalid JSON: ${e instanceof Error ? e.message : String(e)}` };
  }
}

export function runExample(root: string, language: Language, pattern: string): RunResult {
  const r = spawn(root, language, ["run", pattern]);
  let status: RunStatus;
  if (r.spawnError !== null) {
    status = "toolchain-unavailable";
  } else if (r.exitCode === 0) {
    status = "ok";
  } else if (r.exitCode === 2) {
    status = "unknown-example";
  } else {
    status = "failed";
  }
  return { pattern, language: language.id, status, stdout: r.stdout, stderr: r.spawnError ?? r.stderr, exitCode: r.exitCode };
}

export function notImplemented(pattern: string, language: Language): RunResult {
  return { pattern, language: language.id, status: "not-implemented", stdout: "", stderr: "", exitCode: null };
}
