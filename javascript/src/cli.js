// Process entry point: wires the registry, the standard streams and the exit code.
import { run } from "./runtime/cli.js";
import { indexExamples } from "./runtime/contract.js";
import { examples } from "./runtime/registry.js";

const io = {
  write: (text) => process.stdout.write(text),
  error: (text) => process.stderr.write(text),
};

let code;
try {
  code = run(process.argv.slice(2), io, indexExamples(examples));
} catch (e) {
  io.error(`${e instanceof Error ? e.message : String(e)}\n`);
  code = 1;
}
process.exitCode = code;
