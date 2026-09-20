from .subsystem_a import SubsystemA
from .subsystem_b import SubsystemB
from .subsystem_c import SubsystemC


class Facade:
    """Knows which subsystem classes handle a request and drives them in order."""

    def __init__(self) -> None:
        self._a = SubsystemA()
        self._b = SubsystemB()
        self._c = SubsystemC()

    def operation(self) -> str:
        steps = [self._a.operation_a(), self._b.operation_b(), self._c.operation_c()]
        return f"Facade.operation(): {', '.join(steps)}"
