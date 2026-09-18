from patterns.chainofresponsibility import (
    Handler,
    NegativeHandler,
    PositiveHandler,
    ZeroHandler,
    example,
)
from patterns.runtime.contract import BufferOutput


def full_chain() -> Handler:
    head = NegativeHandler()
    head.set_next(ZeroHandler()).set_next(PositiveHandler())
    return head


def test_each_request_is_answered_by_the_responsible_handler() -> None:
    chain = full_chain()
    assert chain.handle(-5) == "negative"
    assert chain.handle(0) == "zero"
    assert chain.handle(7) == "positive"


def test_a_request_nobody_claims_falls_off_the_end() -> None:
    shortened = NegativeHandler()
    shortened.set_next(ZeroHandler())
    assert shortened.handle(1) == "unhandled"
    assert PositiveHandler().handle(-1) == "unhandled"


def test_relinking_changes_who_answers() -> None:
    head = PositiveHandler()
    assert head.handle(-1) == "unhandled"
    head.set_next(NegativeHandler())
    assert head.handle(-1) == "negative"


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "chain-of-responsibility"
    assert out.lines == [
        "Executing Chain of Responsibility Pattern Implementation",
        "  -1 is negative",
        "  0 is zero",
        "  1 is positive",
    ]
