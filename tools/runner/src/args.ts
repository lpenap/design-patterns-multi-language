import { UsageError } from "./context.ts";

export const USAGE = [
  "usage: patterns <command> [options]",
  "  validate [--write-readme] [--json]",
  "  list [--lang <l>] [--json]",
  "  run <id> [--lang <l>]",
  "  run --all [--lang <l>]",
  "  snapshot [--update] [--lang <l>] [--pattern <id>]",
  "  check [--json]",
].join("\n");

export type Command = "validate" | "list" | "run" | "snapshot" | "check";

export interface ParsedArgs {
  readonly command: Command;
  readonly positional: readonly string[];
  readonly flags: ReadonlySet<string>;
  readonly values: ReadonlyMap<string, string>;
}

const COMMANDS: readonly Command[] = ["validate", "list", "run", "snapshot", "check"];
const BOOLEAN_FLAGS = new Set(["--all", "--json", "--update", "--write-readme"]);
const VALUE_FLAGS = new Set(["--lang", "--pattern"]);

export function parseArgs(argv: readonly string[]): ParsedArgs {
  const [first, ...rest] = argv;
  if (first === undefined || !(COMMANDS as readonly string[]).includes(first)) {
    throw new UsageError(USAGE);
  }
  const positional: string[] = [];
  const flags = new Set<string>();
  const values = new Map<string, string>();
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i] ?? "";
    if (BOOLEAN_FLAGS.has(arg)) {
      flags.add(arg);
    } else if (VALUE_FLAGS.has(arg)) {
      const value = rest[i + 1];
      if (value === undefined || value.startsWith("--")) {
        throw new UsageError(`${arg} requires a value`);
      }
      values.set(arg, value);
      i++;
    } else if (arg.startsWith("--")) {
      throw new UsageError(`unknown option ${arg}\n${USAGE}`);
    } else {
      positional.push(arg);
    }
  }
  const command = first as Command;
  if (command === "run" && positional.length + (flags.has("--all") ? 1 : 0) !== 1) {
    throw new UsageError("run takes exactly one of <id> or --all");
  }
  if (command !== "run" && positional.length > 0) {
    throw new UsageError(`${command} takes no positional arguments`);
  }
  return { command, positional, flags, values };
}
