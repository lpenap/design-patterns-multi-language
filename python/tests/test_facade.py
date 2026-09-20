from patterns.facade import Facade, SubsystemA, SubsystemB, SubsystemC, example
from patterns.runtime.contract import BufferOutput


def test_facade_drives_the_subsystem_in_order() -> None:
    assert Facade().operation() == (
        "Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC"
    )


def test_subsystem_classes_remain_usable_directly() -> None:
    assert SubsystemA().operation_a() == "SubsystemA.operationA"
    assert SubsystemB().operation_b() == "SubsystemB.operationB"
    assert SubsystemC().operation_c() == "SubsystemC.operationC"


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "facade"
    assert out.lines == [
        "Executing Facade Pattern Implementation",
        "  Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC",
    ]
