# Pattern Specification: Protection Proxy

**Feature Branch**: `017-protection-proxy`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `protection-proxy` · **Category**: structural · **Icon**: ☔ · **Parity**: strict

**Input**: User description: "Protection Proxy — the access-control variant of Proxy, new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Provide a surrogate or placeholder for another object to control access to it [1, p. 207]; a *protection proxy* checks the caller's rights before forwarding a request.

**Also known as**: Surrogate

**Participants**: Subject, RealSubject, Proxy (`ProtectionProxy`), Client. Shared with spec 018 (Virtual Proxy), which is the same structure with a different purpose.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Subject, RealSubject, ProtectionProxy holding a Subject and a role, and a generic Client.
2. **Given** the doc, **When** a reader reads Related patterns, **Then** the four Proxy variants are listed and Virtual Proxy is cross-referenced.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `protection-proxy`; `<runner> run protection-proxy` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- When access is denied the real subject is never invoked (tested with a counting subject).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Subject` declares `request()`; `RealSubject.request()` returns `RealSubject.request()`.
- **FR-011**: `ProtectionProxy(subject, role)` implements `Subject`; `request()` forwards when `role` is `admin` and otherwise returns `access denied by ProtectionProxy` without touching the subject.
- **FR-012**: The client wraps one real subject in two proxies, roles `admin` and `guest`, and prints `<role>: <result>` for each.
- **FR-013**: Behaviour tests: admin forwarded; guest denied; real subject untouched on denial.

### Expected output

```
Executing Protection Proxy Pattern Implementation
  admin: RealSubject.request()
  guest: access denied by ProtectionProxy
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `protectionproxy` (Java, Python), `protection-proxy` (TypeScript, JavaScript).
