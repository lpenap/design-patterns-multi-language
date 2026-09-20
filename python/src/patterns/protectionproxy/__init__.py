"""Protection Proxy: check the caller's rights before forwarding to the real subject."""

from typing import Protocol

from patterns.runtime.contract import Output


class Subject(Protocol):
    """The common interface of real subject and proxy."""

    def request(self) -> str: ...


class RealSubject:
    """The object the proxy represents."""

    def request(self) -> str:
        return "RealSubject.request()"


class ProtectionProxy:
    """Checks the caller's role before forwarding to the subject."""

    def __init__(self, subject: Subject, role: str) -> None:
        self._subject = subject
        self._role = role

    def request(self) -> str:
        if self._role == "admin":
            return self._subject.request()
        return "access denied by ProtectionProxy"


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
