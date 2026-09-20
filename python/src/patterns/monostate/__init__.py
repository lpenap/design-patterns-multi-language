"""Monostate: ordinary instances that share all their state (a.k.a. Borg)."""

from typing import ClassVar

from patterns.runtime.contract import Output


class Monostate:
    """All state is class-level; instances are ordinary objects that share it.

    The setter writes through ``type(self)``: ``self._value = v`` would create an
    instance attribute that shadows the shared one.
    """

    _value: ClassVar[int] = 0

    def get_value(self) -> int:
        return type(self)._value

    def set_value(self, value: int) -> None:
        type(self)._value = value


class MonostateExample:
    """The client: two ordinary instances that turn out to share their state."""

    id = "monostate"

    def run(self, out: Output) -> None:
        out.line("Executing Monostate Pattern Implementation")
        a = Monostate()
        b = Monostate()
        out.line(f"  Two instances are distinct objects: {str(a is not b).lower()}")
        a.set_value(42)
        out.line(f"  a.setValue(42) then b.getValue(): {b.get_value()}")
        b.set_value(7)
        out.line(f"  b.setValue(7) then a.getValue(): {a.get_value()}")


example = MonostateExample()
