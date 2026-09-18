"""Template Method: fix an algorithm's skeleton, defer some steps to subclasses."""

from abc import ABC, abstractmethod

from patterns.runtime.contract import Output


class AbstractClass(ABC):
    """Fixes the algorithm's skeleton; subclasses supply the steps."""

    def template_method(self) -> str:
        """The skeleton; subclasses vary the steps, never the order."""
        return f"{self.primitive_operation_1()} then {self.primitive_operation_2()}{self.hook()}"

    @abstractmethod
    def primitive_operation_1(self) -> str: ...

    @abstractmethod
    def primitive_operation_2(self) -> str: ...

    def hook(self) -> str:
        """A hook: default behaviour that subclasses may extend."""
        return ""


class ConcreteClassA(AbstractClass):
    def primitive_operation_1(self) -> str:
        return "ConcreteClassA.primitiveOperation1"

    def primitive_operation_2(self) -> str:
        return "ConcreteClassA.primitiveOperation2"


class ConcreteClassB(AbstractClass):
    def primitive_operation_1(self) -> str:
        return "ConcreteClassB.primitiveOperation1"

    def primitive_operation_2(self) -> str:
        return "ConcreteClassB.primitiveOperation2"

    def hook(self) -> str:
        return " with hook"


class TemplateMethodExample:
    """The client: calls the template method through the abstract type."""

    id = "template-method"

    def run(self, out: Output) -> None:
        out.line("Executing Template Method Pattern Implementation")
        instances: list[AbstractClass] = [ConcreteClassA(), ConcreteClassB()]
        for instance in instances:
            out.line(f"  {instance.template_method()}")


example = TemplateMethodExample()
