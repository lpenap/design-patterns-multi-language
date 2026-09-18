import pytest

from patterns.runtime.contract import BufferOutput
from patterns.simplefactory import ConcreteProductA, ConcreteProductB, SimpleFactory, example


def test_maps_type_codes_to_concrete_products() -> None:
    factory = SimpleFactory()
    assert isinstance(factory.create_product("A"), ConcreteProductA)
    assert isinstance(factory.create_product("B"), ConcreteProductB)
    assert factory.create_product("A").name() == "ConcreteProductA"
    assert factory.create_product("B").name() == "ConcreteProductB"


def test_rejects_unknown_types() -> None:
    with pytest.raises(ValueError, match="Unknown product type: Z"):
        SimpleFactory().create_product("Z")


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "simple-factory"
    assert out.lines == [
        "Executing Simple Factory Pattern Implementation",
        "  ConcreteProductA",
        "  ConcreteProductB",
    ]
