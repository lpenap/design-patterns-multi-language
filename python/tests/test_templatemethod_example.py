from patterns.runtime.contract import BufferOutput
from patterns.templatemethod import example


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "template-method"
    assert out.lines == [
        "Executing Template Method Pattern Implementation",
        "  ConcreteClassA.primitiveOperation1 then ConcreteClassA.primitiveOperation2",
        "  ConcreteClassB.primitiveOperation1 then ConcreteClassB.primitiveOperation2 with hook",
    ]
