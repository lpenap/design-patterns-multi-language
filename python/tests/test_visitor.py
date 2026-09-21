from patterns.visitor import (
    ConcreteElementA,
    ConcreteElementB,
    ConcreteVisitor1,
    ConcreteVisitor2,
    ObjectStructure,
)


def structure() -> ObjectStructure:
    s = ObjectStructure()
    for element in (ConcreteElementA(), ConcreteElementB(), ConcreteElementA()):
        s.add(element)
    return s


def test_each_element_dispatches_to_the_visit_method_for_its_class() -> None:
    visitor = ConcreteVisitor1()
    ConcreteElementB().accept(visitor)
    assert visitor.result() == "visited ConcreteElementB"
    other = ConcreteVisitor2()
    ConcreteElementA().accept(other)
    assert other.result() == "A"


def test_visitors_accumulate_over_the_whole_structure() -> None:
    visitor = ConcreteVisitor2()
    structure().accept(visitor)
    assert visitor.result() == "A+B+A"


def test_an_empty_structure_yields_an_empty_result() -> None:
    visitor = ConcreteVisitor1()
    ObjectStructure().accept(visitor)
    assert visitor.result() == ""


def test_a_new_operation_needs_no_change_to_the_elements() -> None:
    counts: list[str] = []

    class Counter:
        def visit_concrete_element_a(self, element: ConcreteElementA) -> None:
            counts.append("a")

        def visit_concrete_element_b(self, element: ConcreteElementB) -> None:
            counts.append("b")

    structure().accept(Counter())
    assert counts == ["a", "b", "a"]
