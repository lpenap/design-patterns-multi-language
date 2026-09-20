"""Interpreter: a class per grammar rule; a sentence is a tree that interprets itself."""

from typing import Protocol

from patterns.runtime.contract import Output


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


class AbstractExpression(Protocol):
    """A node of the abstract syntax tree."""

    def interpret(self, context: Context) -> int: ...

    def describe(self) -> str: ...


class NumberExpression:
    """Terminal: a literal number."""

    def __init__(self, value: int) -> None:
        self._value = value

    def interpret(self, context: Context) -> int:
        return self._value

    def describe(self) -> str:
        return str(self._value)


class VariableExpression:
    """Terminal: a variable looked up in the context."""

    def __init__(self, name: str) -> None:
        self._name = name

    def interpret(self, context: Context) -> int:
        return context.lookup(self._name)

    def describe(self) -> str:
        return self._name


class AddExpression:
    """Nonterminal: expression '+' expression."""

    def __init__(self, left: AbstractExpression, right: AbstractExpression) -> None:
        self._left, self._right = left, right

    def interpret(self, context: Context) -> int:
        return self._left.interpret(context) + self._right.interpret(context)

    def describe(self) -> str:
        return f"({self._left.describe()} + {self._right.describe()})"


class SubtractExpression:
    """Nonterminal: expression '-' expression."""

    def __init__(self, left: AbstractExpression, right: AbstractExpression) -> None:
        self._left, self._right = left, right

    def interpret(self, context: Context) -> int:
        return self._left.interpret(context) - self._right.interpret(context)

    def describe(self) -> str:
        return f"({self._left.describe()} - {self._right.describe()})"


class InterpreterExample:
    """The client: builds the syntax tree by hand and interprets it under two contexts."""

    id = "interpreter"

    def run(self, out: Output) -> None:
        out.line("Executing Interpreter Pattern Implementation")
        expression: AbstractExpression = SubtractExpression(
            AddExpression(VariableExpression("x"), NumberExpression(3)), VariableExpression("y")
        )
        out.line(f"  Expression: {expression.describe()}")
        for x, y in ((5, 2), (10, 0)):
            context = Context().assign("x", x).assign("y", y)
            out.line(f"  With x = {x}, y = {y}: {expression.interpret(context)}")


example = InterpreterExample()
