from patterns.protectionproxy import ProtectionProxy, RealSubject


def test_an_admin_is_forwarded_to_the_real_subject() -> None:
    assert ProtectionProxy(RealSubject(), "admin").request() == "RealSubject.request()"


def test_a_guest_is_denied_and_the_real_subject_is_never_invoked() -> None:
    class Counting:
        calls = 0

        def request(self) -> str:
            self.calls += 1
            return "secret"

    counting = Counting()
    assert ProtectionProxy(counting, "guest").request() == "access denied by ProtectionProxy"
    assert counting.calls == 0
    assert ProtectionProxy(counting, "admin").request() == "secret"
    assert counting.calls == 1
