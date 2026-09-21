import pytest

from patterns.templatemethod import AbstractClass, ConcreteClassA, ConcreteClassB


def test_skeleton_comes_from_the_base_and_steps_from_the_subclass() -> None:
    assert ConcreteClassA().template_method() == (
        "ConcreteClassA.primitiveOperation1 then ConcreteClassA.primitiveOperation2"
    )


def test_an_overridden_hook_extends_the_result() -> None:
    assert ConcreteClassB().template_method() == (
        "ConcreteClassB.primitiveOperation1 then ConcreteClassB.primitiveOperation2 with hook"
    )


def test_the_hook_defaults_to_nothing() -> None:
    class Minimal(AbstractClass):
        def primitive_operation_1(self) -> str:
            return "one"

        def primitive_operation_2(self) -> str:
            return "two"

    assert Minimal().template_method() == "one then two"


def test_a_subclass_missing_a_primitive_operation_cannot_be_instantiated() -> None:
    class Incomplete(AbstractClass):
        def primitive_operation_1(self) -> str:
            return "one"

    with pytest.raises(TypeError):
        Incomplete()  # type: ignore[abstract]
