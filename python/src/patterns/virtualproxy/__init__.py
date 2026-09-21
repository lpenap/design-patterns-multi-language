"""Virtual Proxy: create an expensive object on demand, at the first request."""

from .example import VirtualProxyExample, example
from .real_subject import RealSubject
from .subject import Subject
from .virtual_proxy import VirtualProxy

__all__ = [
    "Subject",
    "RealSubject",
    "VirtualProxy",
    "VirtualProxyExample",
    "example",
]
