from typing import Protocol


class Component(Protocol):
    """The interface shared by objects that can have responsibilities added."""

    def operation(self) -> str: ...
