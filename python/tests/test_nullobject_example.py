from patterns.nullobject import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "null-object"
    assert out.lines == [
        "Executing Null Object Pattern Implementation",
        "  OrderProcessor with OutputLogger:",
        "    [log] processing order 1",
        "    [log] processing order 2",
        "    processed 2 orders",
        "  OrderProcessor with NullLogger:",
        "    processed 2 orders",
        "  The processor never tested its logger for null",
    ]
