"""Abstract Factory: create families of related objects without naming their classes."""

from .abstract_factory import AbstractFactory
from .abstract_product_a import AbstractProductA
from .abstract_product_b import AbstractProductB
from .concrete_factory1 import ConcreteFactory1
from .concrete_factory2 import ConcreteFactory2
from .example import AbstractFactoryExample, example
from .product_a1 import ProductA1
from .product_a2 import ProductA2
from .product_b1 import ProductB1
from .product_b2 import ProductB2

__all__ = [
    "AbstractProductA",
    "AbstractProductB",
    "AbstractFactory",
    "ProductA1",
    "ProductA2",
    "ProductB1",
    "ProductB2",
    "ConcreteFactory1",
    "ConcreteFactory2",
    "AbstractFactoryExample",
    "example",
]
