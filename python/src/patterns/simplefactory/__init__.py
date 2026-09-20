"""Simple Factory: one method decides which concrete product to instantiate."""

from .concrete_product_a import ConcreteProductA
from .concrete_product_b import ConcreteProductB
from .example import SimpleFactoryExample, example
from .product import Product
from .simple_factory import SimpleFactory

__all__ = [
    "Product",
    "ConcreteProductA",
    "ConcreteProductB",
    "SimpleFactory",
    "SimpleFactoryExample",
    "example",
]
