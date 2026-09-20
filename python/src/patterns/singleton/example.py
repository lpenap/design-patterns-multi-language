from __future__ import annotations

from typing import TYPE_CHECKING

from .singleton import Singleton

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


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
