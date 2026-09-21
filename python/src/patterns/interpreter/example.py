from __future__ import annotations

from typing import TYPE_CHECKING

from .add_expression import AddExpression
from .context import Context
from .number_expression import NumberExpression
from .subtract_expression import SubtractExpression
from .variable_expression import VariableExpression

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .abstract_expression import AbstractExpression


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
