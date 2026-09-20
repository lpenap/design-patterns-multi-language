"""Facade: one simple entry point in front of a subsystem."""

from patterns.runtime.contract import Output


class SubsystemA:
    """A subsystem class; knows nothing of the facade."""

    def operation_a(self) -> str:
        return "SubsystemA.operationA"


class SubsystemB:
    def operation_b(self) -> str:
        return "SubsystemB.operationB"


class SubsystemC:
    def operation_c(self) -> str:
        return "SubsystemC.operationC"


class Facade:
    """Knows which subsystem classes handle a request and drives them in order."""

    def __init__(self) -> None:
        self._a = SubsystemA()
        self._b = SubsystemB()
        self._c = SubsystemC()

    def operation(self) -> str:
        steps = [self._a.operation_a(), self._b.operation_b(), self._c.operation_c()]
        return f"Facade.operation(): {', '.join(steps)}"


class FacadeExample:
    """The client: talks to the facade only."""

    id = "facade"

    def run(self, out: Output) -> None:
        out.line("Executing Facade Pattern Implementation")
        out.line(f"  {Facade().operation()}")


example = FacadeExample()
