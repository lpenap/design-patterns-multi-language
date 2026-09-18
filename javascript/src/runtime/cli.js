import { BufferOutput } from "./contract.js";

export const SEPARATOR = "-".repeat(40);
export const USAGE = "usage: patterns list | run <id> | run --all";

/**
 * The language CLI protocol: `list`, `run <id>`, `run --all`.
 * @param {readonly string[]} argv
 * @param {{write: (text: string) => void, error: (text: string) => void}} io
 * @param {Map<string, object>} examples indexed by id, ascending
 * @returns {number} exit code (0, 1 or 2)
 */
export function run(argv, io, examples) {
  const [command, target, ...rest] = argv;
  if (command === "list" && target === undefined) {
    io.write(JSON.stringify([...examples.keys()]) + "\n");
    return 0;
  }
  if (command === "run" && target !== undefined && rest.length === 0) {
    return target === "--all" ? runAll(io, examples) : runOne(target, io, examples);
  }
  io.error(USAGE + "\n");
  return 1;
}

function runOne(id, io, examples) {
  const example = examples.get(id);
  if (example === undefined) {
    io.error(`unknown example: ${id}\n`);
    return 2;
  }
  return execute(example, io) ? 0 : 1;
}

function runAll(io, examples) {
  let allOk = true;
  let printedAny = false;
  for (const example of examples.values()) {
    if (printedAny) {
      io.write(SEPARATOR + "\n");
    }
    const ok = execute(example, io);
    allOk = allOk && ok;
    printedAny = printedAny || ok;
  }
  return allOk ? 0 : 1;
}

/** Runs the example, printing its lines only if it completes; false on failure. */
function execute(example, io) {
  const buffer = new BufferOutput();
  try {
    example.run(buffer);
  } catch (e) {
    io.error(`example failed: ${example.id}: ${e instanceof Error ? e.message : String(e)}\n`);
    return false;
  }
  for (const line of buffer.lines) {
    io.write(line + "\n");
  }
  return true;
}
