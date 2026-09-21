from .abstract_class import AbstractClass


class ConcreteClassB(AbstractClass):
    def primitive_operation_1(self) -> str:
        return "ConcreteClassB.primitiveOperation1"

    def primitive_operation_2(self) -> str:
        return "ConcreteClassB.primitiveOperation2"

    def hook(self) -> str:
        return " with hook"
