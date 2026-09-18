from patterns.adapter import Adaptee, Adapter, Target, example
from patterns.runtime.contract import BufferOutput


def test_translates_request_into_specific_request() -> None:
    target: Target = Adapter(Adaptee())
    assert target.request() == "Adapter(Adaptee)"


def test_delegates_to_whichever_adaptee_it_holds() -> None:
    class Other(Adaptee):
        def specific_request(self) -> str:
            return "Other"

    assert Adapter(Other()).request() == "Adapter(Other)"


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "adapter"
    assert out.lines == ["Executing Adapter Pattern Implementation", "  Adapter(Adaptee)"]
