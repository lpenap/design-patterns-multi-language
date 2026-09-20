from patterns.facade import Facade, SubsystemA, SubsystemB, SubsystemC


def test_facade_drives_the_subsystem_in_order() -> None:
    assert Facade().operation() == (
        "Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC"
    )


def test_subsystem_classes_remain_usable_directly() -> None:
    assert SubsystemA().operation_a() == "SubsystemA.operationA"
    assert SubsystemB().operation_b() == "SubsystemB.operationB"
    assert SubsystemC().operation_c() == "SubsystemC.operationC"
