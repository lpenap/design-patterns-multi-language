# Implementation Plan: Virtual Proxy

**Branch**: `018-virtual-proxy` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/virtual-proxy.md · snapshots/virtual-proxy/*.txt
java/.../patterns/virtualproxy/ Subject RealSubject VirtualProxy VirtualProxyExample (+ services line)
python/src/patterns/virtualproxy/__init__.py · tests/test_virtualproxy.py
typescript/src/virtual-proxy/{virtual-proxy.ts,example.ts,virtual-proxy.test.ts} (+ registry)
javascript/src/virtual-proxy/{virtual-proxy.js,example.js,virtual-proxy.test.js} (+ registry)
```

Design notes: the loader is `Supplier<Subject>` / `Callable[[], Subject]` / `() => Subject`. The example's loader is a lambda that increments a counter and returns `new RealSubject()`.
