import pytest

from patterns.simplefactory import ConcreteProductA, ConcreteProductB, SimpleFactory


def test_maps_type_codes_to_concrete_products() -> None:
    factory = SimpleFactory()
    assert isinstance(factory.create_product("A"), ConcreteProductA)
    assert isinstance(factory.create_product("B"), ConcreteProductB)
    assert factory.create_product("A").name() == "ConcreteProductA"
    assert factory.create_product("B").name() == "ConcreteProductB"


def test_rejects_unknown_types() -> None:
    with pytest.raises(ValueError, match="Unknown product type: Z"):
        SimpleFactory().create_product("Z")
