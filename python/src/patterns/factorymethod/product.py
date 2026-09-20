from typing import Protocol


class Product(Protocol):
    """The interface of the objects the factory method creates."""

    def name(self) -> str: ...
