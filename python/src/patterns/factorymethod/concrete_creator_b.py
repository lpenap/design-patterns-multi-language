from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_product_b import ConcreteProductB
from .creator import Creator

if TYPE_CHECKING:
    from .product import Product


class ConcreteCreatorB(Creator):
    def factory_method(self) -> Product:
        return ConcreteProductB()
