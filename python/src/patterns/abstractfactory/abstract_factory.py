from __future__ import annotations

from typing import TYPE_CHECKING, Protocol

if TYPE_CHECKING:
    from .abstract_product_a import AbstractProductA
    from .abstract_product_b import AbstractProductB


class AbstractFactory(Protocol):
    """Declares one creation operation per abstract product."""

    def create_product_a(self) -> AbstractProductA: ...

    def create_product_b(self) -> AbstractProductB: ...
