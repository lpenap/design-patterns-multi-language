from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_product_a import ConcreteProductA
from .creator import Creator

if TYPE_CHECKING:
    from .product import Product


class ConcreteCreatorA(Creator):
    def factory_method(self) -> Product:
        return ConcreteProductA()
