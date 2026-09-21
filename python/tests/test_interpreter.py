import pytest

from patterns.interpreter import (
    AbstractExpression,
    AddExpression,
    Context,
    NumberExpression,
    SubtractExpression,
    VariableExpression,
)


def test_terminals_interpret_themselves() -> None:
    context = Context().assign("n", 7)
    assert NumberExpression(4).interpret(context) == 4
    assert NumberExpression(4).describe() == "4"
    assert VariableExpression("n").interpret(context) == 7
    assert VariableExpression("n").describe() == "n"


def test_nonterminals_combine_their_children() -> None:
    context = Context()
    assert AddExpression(NumberExpression(2), NumberExpression(3)).interpret(context) == 5
    assert SubtractExpression(NumberExpression(2), NumberExpression(3)).interpret(context) == -1


def test_trees_nest_to_any_depth() -> None:
    deep: AbstractExpression = AddExpression(
        SubtractExpression(
            NumberExpression(10), AddExpression(NumberExpression(1), NumberExpression(2))
        ),
        VariableExpression("z"),
    )
    assert deep.describe() == "((10 - (1 + 2)) + z)"
    assert deep.interpret(Context().assign("z", 1)) == 8
    assert deep.interpret(Context().assign("z", 100)) == 107


def test_an_undefined_variable_is_an_error() -> None:
    with pytest.raises(KeyError, match="undefined variable: q"):
        VariableExpression("q").interpret(Context())
