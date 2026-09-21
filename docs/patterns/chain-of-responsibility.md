# 🐝 Chain of Responsibility

*Behavioural pattern.*

## Intent

Avoid coupling the sender of a request to its receiver by giving more than one
object a chance to handle the request. Chain the receiving objects and pass the
request along the chain until an object handles it [1, p. 223].

## Motivation

Consider a context-sensitive help system: the object that should answer a help
request depends on where the user is and how specific the available help is,
and the requester cannot know in advance which object that is. Rather than
encoding that knowledge in the sender, each candidate receiver is linked to a
successor. A receiver either handles the request or forwards it, so the sender
only needs a reference to the first link.

## Structure

```mermaid
classDiagram
    class Handler {
        <<abstract>>
        -next : Handler
        +setNext(Handler) Handler
        +handle(request) String
    }
    class NegativeHandler {
        +handle(request) String
    }
    class ZeroHandler {
        +handle(request) String
    }
    class PositiveHandler {
        +handle(request) String
    }
    class Client
    Handler o--> Handler : next
    Handler <|-- NegativeHandler
    Handler <|-- ZeroHandler
    Handler <|-- PositiveHandler
    Client --> Handler
```

## Participants

| Role [1] | Responsibility | Java | Python | TypeScript | JavaScript |
|---|---|---|---|---|---|
| Handler | Declares `handle()`, stores the successor set by `setNext()` and implements the default: forward if there is a successor, otherwise answer `unhandled`. | [`Handler`](../../java/src/main/java/com/penapereira/patterns/chainofresponsibility/Handler.java) | [`Handler`](../../python/src/patterns/chainofresponsibility/handler.py) (`set_next`, `handle`) | [`Handler`](../../typescript/src/chain-of-responsibility/handler.ts) | [`Handler`](../../javascript/src/chain-of-responsibility/chain-of-responsibility.js) |
| ConcreteHandler | Each handles the requests it is responsible for (negative, zero or positive integers) and defers the rest. | [`NegativeHandler`](../../java/src/main/java/com/penapereira/patterns/chainofresponsibility/NegativeHandler.java), `ZeroHandler`, `PositiveHandler` | `NegativeHandler`, `ZeroHandler`, `PositiveHandler` | `NegativeHandler`, `ZeroHandler`, `PositiveHandler` | `NegativeHandler`, `ZeroHandler`, `PositiveHandler` |
| Client | Assembles the chain and sends requests to its first link. | [`ChainOfResponsibilityExample`](../../java/src/main/java/com/penapereira/patterns/chainofresponsibility/ChainOfResponsibilityExample.java) | `ChainOfResponsibilityExample` | [`chainOfResponsibilityExample`](../../typescript/src/chain-of-responsibility/example.ts) | [`chainOfResponsibilityExample`](../../javascript/src/chain-of-responsibility/example.js) |

Gamma et al. observe that the successor link and the default forwarding are
best placed in the handler base class so that concrete handlers only decide
whether to act [1, p. 226].

## The example

The client links the handlers in the order negative, zero, positive, then sends
the requests −1, 0 and 1 to the head of the chain:

```
Executing Chain of Responsibility Pattern Implementation
  -1 is negative
  0 is zero
  1 is positive
```

A request that no handler claims reaches the end of the chain and is reported
as `unhandled`. The tests exercise a request that falls off a shortened chain, a
lone handler with no successor, and relinking. Run it with
`make run P=chain-of-responsibility`.

## Consequences

* **Reduced coupling.** The sender knows neither which handler will act nor how
  many exist.
* **Added flexibility.** Responsibilities can be redistributed by relinking the
  chain at run time.
* **Receipt is not guaranteed.** A request may fall off the end. The explicit
  `unhandled` result makes that outcome visible rather than silent.
* **Cost.** Each request may traverse several handlers before finding a taker.

The literature distinguishes the *pure* form, in which exactly one handler acts
and stops the chain, from the *impure* form, in which every handler may act and
then pass the request on. This example is pure.

## Language notes

* **Java.** Servlet filters (`jakarta.servlet.FilterChain`) and Logback's
  logger hierarchy, where an event propagates to parent loggers' appenders, are
  impure everyday chains. `setNext` returning its argument lets a chain be
  written in one expression.
* **Python.** The chain is often a list of callables iterated until one returns
  a non-`None` result; the class version here keeps the successor link
  explicit. WSGI and ASGI middleware stacks are impure chains.
* **TypeScript.** Same structure as Java with `protected` access to the
  successor; Express-style `(req, res, next)` middleware is the ubiquitous
  impure form, `next()` being the successor call.
* **JavaScript.** As TypeScript, without types. DOM event bubbling is a chain
  built into the platform: an event travels from target to ancestors until a
  listener calls `stopPropagation()`.

## Related patterns

* **Composite**: a component's parent can act as its successor, so the chain
  follows the object tree.
* **Command**: the request travelling down the chain is often reified as a
  command object.
* **Decorator**: has the same "linked objects of one interface" shape, but every
  decorator always acts, whereas a handler chooses.

## References

See [`references.md`](../references.md).

1. Gamma, Helm, Johnson and Vlissides, *Design Patterns*, pp. 223–232.
3. Freeman and Robson, *Head First Design Patterns*, 2nd ed., appendix "Leftover Patterns".
