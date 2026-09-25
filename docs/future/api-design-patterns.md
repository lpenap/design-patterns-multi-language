# Future work: API design patterns

*Status: reviewed on 2026-09-25 and deliberately left out of this repository
(PLAN.md decision 19). Kept here so a separate project can start from it.*

## Why not here

Geewax's patterns [23] are about the wire contract of a resource-oriented web
API: how resources are named, which standard methods they expose, how a list
is paged or filtered, how a long-running operation is represented. They are
protocol shapes rather than object structures. Everything in this repository is
a class-level pattern that a CLI can demonstrate by printing what the objects
do; an API pattern demonstrated without HTTP loses the part that matters,
and demonstrating it with HTTP means a server, a client and a port per
language, which the current toolchains and CI were not designed for.

## What a separate project would build

The catalogue of [23], grouped as the book does:

| Group | Patterns |
|---|---|
| Fundamentals | Resource scope and hierarchy, data types and defaults, resource identification |
| Standard methods | Get, list, create, update, delete; partial updates and retrievals with field masks; custom methods |
| Long-running work | Long-running operations, rerunnable jobs |
| Resource relationships | Singleton sub-resources, cross references, association resources, add and remove custom methods, polymorphism |
| Collective operations | Copy and move, batch operations, criteria-based deletion, anonymous writes, pagination, filtering, importing and exporting |
| Safety and evolution | Versioning and compatibility, soft deletion, request deduplication, request validation, resource revisions, request retrial, request authentication |

About ten of them stay deterministic and offline when modelled in-process as a
resource service with request and response objects: pagination with opaque
page tokens, filtering, field-mask partial updates, long-running operation
objects with polling, batch operations, soft deletion, resource revisions,
request deduplication with idempotency keys, request validation, versioning.
Those could be shown with this repository's contract, but each would be a
class-level echo of a protocol pattern.

A project that adopts them would:

1. pick one transport per language (JDK `HttpServer`, Python `http.server` or
   a small framework, Node `http`) and one client, and make the example start
   the server on an ephemeral port, drive it, print the exchanges and stop it;
2. keep the snapshot idea, with the printed exchanges as the reference output
   and ports and timestamps normalised;
3. document each pattern with the request and response shapes as the
   "structure" section, in place of a class diagram.

## References

- [23] J. J. Geewax, *API Design Patterns*. Manning, 2021.
