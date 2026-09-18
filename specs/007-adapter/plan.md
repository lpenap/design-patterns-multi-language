# Implementation Plan: Adapter

**Branch**: `007-adapter` | **Date**: 2026-09-18 | **Spec**: [spec.md](spec.md)

Same shape as specs 002–006; constitution check all PASS.

```text
docs/patterns/adapter.md · snapshots/adapter/*.txt
java/.../patterns/adapter/ Target Adaptee Adapter AdapterExample (+ services line)
python/src/patterns/adapter/__init__.py · tests/test_adapter.py
typescript/src/adapter/{adapter.ts,example.ts,adapter.test.ts} (+ registry)
javascript/src/adapter/{adapter.js,example.js,adapter.test.js} (+ registry)
```

Design notes: object adapter everywhere (composition). Python's `Target` is a Protocol with `request`; the adaptee exposes `specific_request`. Language notes mention class adapters via multiple inheritance in Python, and standard-library adapters (`InputStreamReader`, `Arrays.asList`; Python's `io.TextIOWrapper`; Node's `stream.Readable.from`).
