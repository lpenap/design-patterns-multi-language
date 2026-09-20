"""Virtual Proxy: create an expensive object on demand, at the first request."""

from collections.abc import Callable
from typing import Protocol

from patterns.runtime.contract import Output


class Subject(Protocol):
    """The common interface of real subject and proxy."""

    def request(self) -> str: ...


class RealSubject:
    """The expensive object the proxy stands in for."""

    def request(self) -> str:
        return "RealSubject.request()"


class VirtualProxy:
    """Creates the real subject on the first request and forwards every request to it."""

    def __init__(self, loader: Callable[[], Subject]) -> None:
        self._loader = loader
        self._real_subject: Subject | None = None

    def request(self) -> str:
        if self._real_subject is None:
            self._real_subject = self._loader()
        return self._real_subject.request()

    def is_loaded(self) -> bool:
        return self._real_subject is not None


class VirtualProxyExample:
    """The client: observes that the real subject is created once, at the first request."""

    id = "virtual-proxy"

    def run(self, out: Output) -> None:
        out.line("Executing Virtual Proxy Pattern Implementation")
        creations = 0

        def load() -> Subject:
            nonlocal creations
            creations += 1
            return RealSubject()

        proxy = VirtualProxy(load)
        out.line(f"  Proxy created, real subject loaded: {str(proxy.is_loaded()).lower()}")
        subject: Subject = proxy
        out.line(f"  {subject.request()}")
        out.line(f"  {subject.request()}")
        out.line(
            f"  Real subject loaded: {str(proxy.is_loaded()).lower()}, created {creations} time"
        )


example = VirtualProxyExample()
