from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .subject import Subject


class ProtectionProxy:
    """Checks the caller's role before forwarding to the subject."""

    def __init__(self, subject: Subject, role: str) -> None:
        self._subject = subject
        self._role = role

    def request(self) -> str:
        if self._role == "admin":
            return self._subject.request()
        return "access denied by ProtectionProxy"
