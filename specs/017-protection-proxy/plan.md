# Implementation Plan: Protection Proxy

**Branch**: `017-protection-proxy` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/protection-proxy.md · snapshots/protection-proxy/*.txt
java/.../patterns/protectionproxy/ Subject RealSubject ProtectionProxy ProtectionProxyExample (+ services line)
python/src/patterns/protectionproxy/__init__.py · tests/test_protectionproxy.py
typescript/src/protection-proxy/{protection-proxy.ts,example.ts,protection-proxy.test.ts} (+ registry)
javascript/src/protection-proxy/{protection-proxy.js,example.js,protection-proxy.test.js} (+ registry)
```

Design notes: the proxy takes the subject as a `Subject`, not a `RealSubject`, so proxies compose (a protection proxy around a virtual proxy is legal). The role is a plain string; a real system would consult a principal.
