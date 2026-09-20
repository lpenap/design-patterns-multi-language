from patterns.runtime.contract import BufferOutput
from patterns.virtualproxy import RealSubject, Subject, VirtualProxy, example


class CountingLoader:
    def __init__(self) -> None:
        self.creations = 0

    def __call__(self) -> Subject:
        self.creations += 1
        return RealSubject()


def test_constructing_the_proxy_does_not_create_the_real_subject() -> None:
    loader = CountingLoader()
    proxy = VirtualProxy(loader)
    assert not proxy.is_loaded()
    assert loader.creations == 0


def test_the_real_subject_is_created_once_and_reused_for_every_request() -> None:
    loader = CountingLoader()
    proxy = VirtualProxy(loader)
    assert proxy.request() == "RealSubject.request()"
    assert proxy.is_loaded()
    proxy.request()
    proxy.request()
    assert loader.creations == 1


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
