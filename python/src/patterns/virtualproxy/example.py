from __future__ import annotations

from typing import TYPE_CHECKING

from .real_subject import RealSubject
from .virtual_proxy import VirtualProxy

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .subject import Subject


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
