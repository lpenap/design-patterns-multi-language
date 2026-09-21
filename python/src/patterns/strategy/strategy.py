from typing import Protocol


class Strategy(Protocol):
    """The interface common to all algorithms."""

    def execute_algorithm(self) -> str: ...
