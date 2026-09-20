from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from typing import ClassVar


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
