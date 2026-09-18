from patterns.runtime.contract import Output


class Dup:
    id = "fixture-alpha"

    def run(self, out: Output) -> None:
        out.line("dup")


example = Dup()
