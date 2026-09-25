from patterns.objectpool import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "object-pool"
    assert out.lines == [
        "Executing Object Pool Pattern Implementation",
        "  Task A -> Reusable#1 (use 1)",
        "  Task B -> Reusable#2 (use 1)",
        "  Task C -> pool exhausted, 2 of 2 in use",
        "  Released Reusable#1",
        "  Task C -> Reusable#1 (use 2)",
        "  Created 2 objects for 4 requests",
    ]
