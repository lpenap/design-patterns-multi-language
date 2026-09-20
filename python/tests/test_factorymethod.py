import pytest

from patterns.factorymethod import (
    ConcreteCreatorA,
    ConcreteCreatorB,
    Creator,
    Product,
)


def test_each_concrete_creator_builds_its_own_product() -> None:
    assert ConcreteCreatorA().an_operation() == "Built ConcreteProductA"
    assert ConcreteCreatorB().an_operation() == "Built ConcreteProductB"


def test_template_operation_uses_whatever_the_subclass_returns() -> None:
    class Custom:
        def name(self) -> str:
            return "Custom"

    class CustomCreator(Creator):
        def factory_method(self) -> Product:
            return Custom()

    assert CustomCreator().an_operation() == "Built Custom"


def test_a_creator_without_factory_method_cannot_be_instantiated() -> None:
    class Incomplete(Creator):
        pass

    with pytest.raises(TypeError):
        Incomplete()  # type: ignore[abstract]
