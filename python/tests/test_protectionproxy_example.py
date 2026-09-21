from patterns.protectionproxy import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "protection-proxy"
    assert out.lines == [
        "Executing Protection Proxy Pattern Implementation",
        "  admin: RealSubject.request()",
        "  guest: access denied by ProtectionProxy",
    ]
