from typing import Protocol


class Command(Protocol):
    """Declares the interface for executing and undoing an operation."""

    def execute(self) -> None: ...

    def undo(self) -> None: ...

    def describe(self) -> str: ...
