from .abstraction import Abstraction


class RefinedAbstraction(Abstraction):
    """Extends the abstraction's behaviour without knowing the concrete implementor."""

    def operation(self) -> str:
        return f"RefinedAbstraction({self._implementor.operation_impl()})"
