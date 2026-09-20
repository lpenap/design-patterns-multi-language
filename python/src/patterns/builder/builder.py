from __future__ import annotations

from typing import TYPE_CHECKING, Protocol

if TYPE_CHECKING:
    from .product import Product


class Builder(Protocol):
    """The abstract interface for creating parts of a product."""

    def build_part_a(self) -> None: ...

    def build_part_b(self) -> None: ...

    def get_result(self) -> Product: ...
