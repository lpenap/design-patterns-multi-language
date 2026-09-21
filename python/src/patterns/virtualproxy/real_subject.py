class RealSubject:
    """The expensive object the proxy stands in for."""

    def request(self) -> str:
        return "RealSubject.request()"
