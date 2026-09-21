from .abstract_class import AbstractClass


class ConcreteClassA(AbstractClass):
    def primitive_operation_1(self) -> str:
        return "ConcreteClassA.primitiveOperation1"

    def primitive_operation_2(self) -> str:
        return "ConcreteClassA.primitiveOperation2"
