from patterns.iterator import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "iterator"
    assert out.lines == [
        "Executing Iterator Pattern Implementation",
        "  ConcreteIterator traversal: a b c",
        "  Two iterators are independent: first.next()=a, second.next()=a",
    ]
