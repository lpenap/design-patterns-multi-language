from typing import Protocol


class Subject(Protocol):
    """The common interface of real subject and proxy."""

    def request(self) -> str: ...
