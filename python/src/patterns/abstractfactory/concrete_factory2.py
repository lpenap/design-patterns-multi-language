from __future__ import annotations

from typing import TYPE_CHECKING

from .product_a2 import ProductA2
from .product_b2 import ProductB2

if TYPE_CHECKING:
    from .abstract_product_a import AbstractProductA
    from .abstract_product_b import AbstractProductB


class ConcreteFactory2:
    """Creates the products of family 2."""

    def create_product_a(self) -> AbstractProductA:
        return ProductA2()

    def create_product_b(self) -> AbstractProductB:
        return ProductB2()
