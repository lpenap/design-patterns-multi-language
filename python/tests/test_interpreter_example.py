from patterns.interpreter import (
    example,
)
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "interpreter"
    assert out.lines == [
        "Executing Interpreter Pattern Implementation",
        "  Expression: ((x + 3) - y)",
        "  With x = 5, y = 2: 6",
        "  With x = 10, y = 0: 13",
    ]
