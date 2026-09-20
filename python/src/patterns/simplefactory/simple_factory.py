from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_product_a import ConcreteProductA
from .concrete_product_b import ConcreteProductB

if TYPE_CHECKING:
    from .product import Product


class SimpleFactory:
    """Maps a type code to a concrete product; the single place where products are created."""

    def create_product(self, type_code: str) -> Product:
        match type_code:
            case "A":
                return ConcreteProductA()
            case "B":
                return ConcreteProductB()
            case _:
                raise ValueError(f"Unknown product type: {type_code}")
