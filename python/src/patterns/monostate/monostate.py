from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from typing import ClassVar


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
