from patterns.abstractfactory import (
    AbstractFactory,
    ConcreteFactory1,
    ConcreteFactory2,
    ProductA1,
    ProductB2,
)


def names_from(factory: AbstractFactory) -> list[str]:
    """Client code written against the abstract types only."""
    return [factory.create_product_a().name(), factory.create_product_b().name()]


def test_each_factory_produces_its_own_family() -> None:
    assert names_from(ConcreteFactory1()) == ["ProductA1", "ProductB1"]
    assert names_from(ConcreteFactory2()) == ["ProductA2", "ProductB2"]


def test_products_are_of_the_concrete_family_classes() -> None:
    assert isinstance(ConcreteFactory1().create_product_a(), ProductA1)
    assert isinstance(ConcreteFactory2().create_product_b(), ProductB2)
