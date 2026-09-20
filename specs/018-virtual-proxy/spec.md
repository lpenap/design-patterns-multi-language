# Pattern Specification: Virtual Proxy

**Feature Branch**: `018-virtual-proxy`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `virtual-proxy` · **Category**: structural · **Icon**: 🍬 · **Parity**: strict

**Input**: User description: "Virtual Proxy — the lazy-creation variant of Proxy, new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Provide a surrogate or placeholder for another object to control access to it [1, p. 207]; a *virtual proxy* creates an expensive object on demand, at the first request that needs it.

**Also known as**: Surrogate; lazy initialisation proxy

**Participants**: Subject, RealSubject, Proxy (`VirtualProxy`), Client. Same structure as spec 017 (Protection Proxy).

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Subject, RealSubject, VirtualProxy holding a loader and an optional RealSubject, and a generic Client.
2. **Given** the doc, **When** a reader reads The example, **Then** it is clear the real subject is created once, at the first request, not at proxy construction.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `virtual-proxy`; `<runner> run virtual-proxy` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- Constructing the proxy does not construct the real subject (tested).
- Repeated requests reuse the one real subject (tested with a counting loader).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Subject` declares `request()`; `RealSubject.request()` returns `RealSubject.request()`.
- **FR-011**: `VirtualProxy(loader)` implements `Subject`, where `loader` is a function producing the real subject; `request()` creates the real subject through the loader on first call and forwards every call; `isLoaded()` reports whether it has been created.
- **FR-012**: The client counts how many times its loader runs, prints the loaded state after constructing the proxy, calls `request()` twice printing each result, then prints the loaded state and the creation count.
- **FR-013**: Behaviour tests: not loaded after construction; loaded after first request; loader called exactly once across several requests; results forwarded.

### Expected output

```
Executing Virtual Proxy Pattern Implementation
  Proxy created, real subject loaded: false
  RealSubject.request()
  RealSubject.request()
  Real subject loaded: true, created 1 time
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `virtualproxy` (Java, Python), `virtual-proxy` (TypeScript, JavaScript).
- The proxy takes a loader function rather than constructing `RealSubject` itself so that tests and the client can observe creation without instrumenting the real subject.
