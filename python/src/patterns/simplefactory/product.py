from typing import Protocol


class Product(Protocol):
    """The interface every product implements."""

    def name(self) -> str: ...
