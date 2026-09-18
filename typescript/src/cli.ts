// Process entry point: wires the registry, the standard streams and the exit code.
import { run } from "./runtime/cli.ts";
import { indexExamples, type Io } from "./runtime/contract.ts";
import { examples } from "./runtime/registry.ts";

const io: Io = {
  write: (text) => void process.stdout.write(text),
  error: (text) => void process.stderr.write(text),
};

let code: number;
try {
  code = run(process.argv.slice(2), io, indexExamples(examples));
} catch (e) {
  io.error(`${e instanceof Error ? e.message : String(e)}\n`);
  code = 1;
}
process.exitCode = code;
