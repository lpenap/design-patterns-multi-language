// A stand-in for a language CLI. Implements the protocol of
// specs/001-cli-runner/contracts/language-cli.md from behaviour.json so the
// orchestrator's tests never need a real toolchain.
import { appendFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const [lang, command, target, ...rest] = process.argv.slice(2);
appendFileSync(join(here, "invocations.log"), `${lang} ${command ?? ""} ${target ?? ""}\n`);

const behaviour = JSON.parse(readFileSync(join(here, "behaviour.json"), "utf8"))[lang];
const ids = Object.keys(behaviour.examples).sort();
const SEP = "-".repeat(40);

function runOne(id) {
  if (!ids.includes(id)) {
    process.stderr.write(`unknown example: ${id}\n`);
    return 2;
  }
  if (behaviour.fail.includes(id)) {
    process.stderr.write(`example failed: ${id}: boom\n`);
    return 1;
  }
  process.stdout.write(behaviour.examples[id].map((l) => l + "\n").join(""));
  return 0;
}

if (command === "list" && target === undefined) {
  process.stdout.write(JSON.stringify(ids) + "\n");
  process.exitCode = 0;
} else if (command === "run" && target === "--all" && rest.length === 0) {
  let code = 0;
  let printed = false;
  for (const id of ids) {
    if (printed) process.stdout.write(SEP + "\n");
    const c = runOne(id);
    if (c === 0) printed = true;
    else code = 1;
  }
  process.exitCode = code;
} else if (command === "run" && target !== undefined && rest.length === 0) {
  process.exitCode = runOne(target);
} else {
  process.stderr.write("usage: patterns list | run <id> | run --all\n");
  process.exitCode = 1;
}
