from abc import ABC, abstractmethod


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
