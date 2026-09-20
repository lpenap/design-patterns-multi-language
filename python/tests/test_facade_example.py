from patterns.facade import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "facade"
    assert out.lines == [
        "Executing Facade Pattern Implementation",
        "  Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC",
    ]
