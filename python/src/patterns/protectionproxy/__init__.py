"""Protection Proxy: check the caller's rights before forwarding to the real subject."""

from .example import ProtectionProxyExample, example
from .protection_proxy import ProtectionProxy
from .real_subject import RealSubject
from .subject import Subject

__all__ = [
    "Subject",
    "RealSubject",
    "ProtectionProxy",
    "ProtectionProxyExample",
    "example",
]
