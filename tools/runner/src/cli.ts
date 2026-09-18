// Process entry point: wires the working directory, the standard streams and the exit code.
import { main } from "./main.ts";

process.exitCode = main(process.argv.slice(2), {
  cwd: process.cwd(),
  io: {
    write: (text) => void process.stdout.write(text),
    error: (text) => void process.stderr.write(text),
  },
});
