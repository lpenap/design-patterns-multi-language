# Implementation Plan: Command

**Branch**: `022-command` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/command.md · snapshots/command/*.txt
java/.../patterns/command/ Command ConcreteCommand Receiver Invoker CommandExample (+ services line)
python/src/patterns/command/__init__.py · tests/test_command.py
typescript/src/command/{command.ts,example.ts,command.test.ts} (+ registry)
javascript/src/command/{command.js,example.js,command.test.js} (+ registry)
```

Design notes: the history is a stack (`ArrayDeque`, list, array). `Invoker.undo()` returns `Optional<Command>` / `Command | None` / `Command | undefined` so the client can report what was undone.
