# Design principles

The patterns in this repository are means, not ends. Each one exists to honour
one or more of the principles below, and every pattern document names, right
after its intent, the principles it relies on. The statements here follow the
wording of Head First Design Patterns [3] and Head First Object-Oriented
Analysis and Design [17], with the original sources where there is one.
Numbers in brackets refer to [`references.md`](references.md).

## Encapsulate what varies

Identify the aspects of the application that vary and separate them from what
stays the same, so that a change to the varying part does not ripple through
the rest [3, ch. 1; 17, ch. 5]. Almost every pattern is an application of this
principle to a particular kind of variation: the algorithm (Strategy), the
object being created (Factory Method), the state-dependent behaviour (State).

## Program to an interface

Program to an interface, not an implementation [1, p. 18; 3, ch. 1]. Clients
depend on an abstract type and stay unaware of the concrete class behind it,
which is what lets implementations be swapped, decorated, proxied or composed.

## Favour composition over inheritance

Prefer object composition to class inheritance [1, p. 20; 3, ch. 1].
Behaviour assembled at run time from parts is easier to change than behaviour
fixed by a class hierarchy at compile time; Strategy, Decorator and Bridge are
the clearest cases.

## Loose coupling

Strive for loosely coupled designs between objects that interact [3, ch. 2].
The less two objects know about each other, the more each can change on its
own. Observer, Mediator and Command all reduce what a sender needs to know
about its receivers.

## Open-closed principle

Software entities should be open for extension but closed for modification
[9, §2.3; 8, ch. 9; 3, ch. 3]. New behaviour arrives as new classes rather than
as edits to working ones; Decorator, Strategy, State and Visitor are organised
around this.

## Single responsibility principle

A class should have only one reason to change [8, ch. 8; 17, ch. 8]. Patterns
that pull a secondary concern out of a class, such as Iterator (traversal),
Memento (history) or Proxy (access control, lazy creation), apply it.

## Liskov substitution principle

Subtypes must be substitutable for their base types [22; 8, ch. 10; 17, ch. 8].
Every pattern that hands a client an abstract type depends on this: the client
must behave correctly whichever concrete type it receives.

## Dependency inversion principle

Depend upon abstractions, not upon concrete classes [8, ch. 11; 3, ch. 4]. The
creational patterns are its main vehicle: Factory Method and Abstract Factory
let high-level code create objects without naming their classes.

## Principle of least knowledge

Talk only to your immediate friends [3, ch. 7], also known as the Law of
Demeter. A method should call methods on itself, its parameters, objects it
creates and its own components, and not reach through them. Façade is the
pattern that restores this when a subsystem has grown too wide.

## Hollywood principle

Don't call us, we'll call you [3, ch. 8]. High-level components decide when
and how low-level components take part, never the reverse. Template Method
embodies it, and so do the factory-method hooks of the creational patterns.

## Delegation

Hand a task to another object instead of doing it yourself or inheriting it
[17, ch. 1 and 5]. Delegation is the mechanism behind composition: the
delegating object stays small and the delegate can be replaced.

## Don't repeat yourself

Every piece of knowledge must have a single, unambiguous, authoritative
representation within a system [21, ch. 2; 17, ch. 6]. Template Method keeps
the skeleton of an algorithm in one place; Flyweight keeps shared state in one
place.
