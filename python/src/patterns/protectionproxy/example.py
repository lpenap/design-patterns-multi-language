from __future__ import annotations

from typing import TYPE_CHECKING

from .protection_proxy import ProtectionProxy
from .real_subject import RealSubject

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .subject import Subject


class ProtectionProxyExample:
    """The client: makes the same call through proxies carrying different roles."""

    id = "protection-proxy"

    def run(self, out: Output) -> None:
        out.line("Executing Protection Proxy Pattern Implementation")
        real = RealSubject()
        for role in ("admin", "guest"):
            subject: Subject = ProtectionProxy(real, role)
            out.line(f"  {role}: {subject.request()}")


example = ProtectionProxyExample()
