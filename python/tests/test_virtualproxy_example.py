from patterns.runtime.contract import BufferOutput
from patterns.virtualproxy import example


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "virtual-proxy"
    assert out.lines == [
        "Executing Virtual Proxy Pattern Implementation",
        "  Proxy created, real subject loaded: false",
        "  RealSubject.request()",
        "  RealSubject.request()",
        "  Real subject loaded: true, created 1 time",
    ]
