import pytest

from patterns.producerconsumer import (
    example,
)
from patterns.runtime.contract import BufferOutput


@pytest.mark.parametrize("run", range(5))
def test_example_prints_the_same_lines_on_every_run(run: int) -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "producer-consumer"
    assert out.lines == [
        "Executing Producer/Consumer Pattern Implementation",
        "  Buffer capacity 2, 1 producer, 2 consumers",
        "  Produced: 1 2 3 4 5",
        "  Consumed: 1 2 3 4 5",
        "  Each item consumed exactly once: true",
    ]
