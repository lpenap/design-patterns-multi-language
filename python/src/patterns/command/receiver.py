class Receiver:
    """Knows how to perform the operations associated with a request."""

    def __init__(self) -> None:
        self._words: list[str] = []

    def action(self, word: str) -> None:
        self._words.append(word)

    def reverse(self, word: str) -> None:
        if word in self._words:
            del self._words[len(self._words) - 1 - self._words[::-1].index(word)]

    def get_state(self) -> str:
        return " ".join(self._words)
