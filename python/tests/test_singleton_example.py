from patterns.runtime.contract import BufferOutput
from patterns.singleton import example


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "singleton"
    assert out.lines == [
        "Executing Singleton Pattern Implementation",
        "  Same instance returned twice: true",
        "  Singleton is doing something",
    ]
