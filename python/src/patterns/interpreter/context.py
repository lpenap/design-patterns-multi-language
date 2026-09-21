class Context:
    """Information global to the interpreter: the variable bindings."""

    def __init__(self) -> None:
        self._variables: dict[str, int] = {}

    def assign(self, name: str, value: int) -> "Context":
        self._variables[name] = value
        return self

    def lookup(self, name: str) -> int:
        if name not in self._variables:
            raise KeyError(f"undefined variable: {name}")
        return self._variables[name]
