"""The language CLI protocol: ``list``, ``run <id>``, ``run --all``."""

import json
import sys
from collections.abc import Mapping, Sequence
from typing import TextIO

from patterns.runtime.contract import BufferOutput, Example

SEPARATOR = "-" * 40
USAGE = "usage: patterns list | run <id> | run --all"


def run(
    argv: Sequence[str], stdout: TextIO, stderr: TextIO, examples: Mapping[str, Example]
) -> int:
    """Run one command; return the process exit code (0, 1 or 2)."""
    if len(argv) == 1 and argv[0] == "list":
        stdout.write(json.dumps(sorted(examples), separators=(",", ":")) + "\n")
        return 0
    if len(argv) == 2 and argv[0] == "run":
        if argv[1] == "--all":
            return _run_all(stdout, stderr, examples)
        return _run_one(argv[1], stdout, stderr, examples)
    stderr.write(USAGE + "\n")
    return 1


def _run_one(
    example_id: str, stdout: TextIO, stderr: TextIO, examples: Mapping[str, Example]
) -> int:
    example = examples.get(example_id)
    if example is None:
        stderr.write(f"unknown example: {example_id}\n")
        return 2
    return 0 if _execute(example, stdout, stderr) else 1


def _run_all(stdout: TextIO, stderr: TextIO, examples: Mapping[str, Example]) -> int:
    all_ok = True
    printed_any = False
    for example_id in sorted(examples):
        if printed_any:
            stdout.write(SEPARATOR + "\n")
        ok = _execute(examples[example_id], stdout, stderr)
        all_ok = all_ok and ok
        printed_any = printed_any or ok
    return 0 if all_ok else 1


def _execute(example: Example, stdout: TextIO, stderr: TextIO) -> bool:
    """Run the example, printing its lines only if it completes; False on failure."""
    buffer = BufferOutput()
    try:
        example.run(buffer)
    except Exception as e:  # noqa: BLE001 - any failure is reported the same way
        stderr.write(f"example failed: {example.id}: {e}\n")
        return False
    for line in buffer.lines:
        stdout.write(line + "\n")
    return True


def main() -> None:  # pragma: no cover - process wiring only
    from patterns.runtime.discovery import DuplicateExampleError, discover

    try:
        examples = discover()
    except DuplicateExampleError as e:
        sys.stderr.write(f"{e}\n")
        sys.exit(1)
    sys.exit(run(sys.argv[1:], sys.stdout, sys.stderr, examples))
