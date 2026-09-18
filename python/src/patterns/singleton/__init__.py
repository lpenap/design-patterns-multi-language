"""Singleton: one instance, reached through a class operation."""

from __future__ import annotations

from typing import ClassVar

from patterns.runtime.contract import Output


class Singleton:
    """The sole instance is created on first use.

    Textbook lazy initialisation: not thread-safe, and Python cannot hide the
    constructor; see the pattern document for the idiomatic alternatives.
    """

    _unique_instance: ClassVar[Singleton | None] = None

    @classmethod
    def instance(cls) -> Singleton:
        if cls._unique_instance is None:
            cls._unique_instance = cls()
        return cls._unique_instance

    def do_something(self) -> str:
        return "Singleton is doing something"


class SingletonExample:
    """The client: obtains the instance through instance() only."""

    id = "singleton"

    def run(self, out: Output) -> None:
        out.line("Executing Singleton Pattern Implementation")
        first = Singleton.instance()
        second = Singleton.instance()
        out.line(f"  Same instance returned twice: {str(first is second).lower()}")
        out.line(f"  {first.do_something()}")


example = SingletonExample()
