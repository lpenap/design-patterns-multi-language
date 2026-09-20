from __future__ import annotations

from typing import TYPE_CHECKING

from .product_a1 import ProductA1
from .product_b1 import ProductB1

if TYPE_CHECKING:
    from .abstract_product_a import AbstractProductA
    from .abstract_product_b import AbstractProductB


class ConcreteFactory1:
    """Creates the products of family 1."""

    def create_product_a(self) -> AbstractProductA:
        return ProductA1()

    def create_product_b(self) -> AbstractProductB:
        return ProductB1()
