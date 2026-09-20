from typing import Protocol


class Implementor(Protocol):
    """The interface for implementation classes: primitive operations only."""

    def operation_impl(self) -> str: ...
