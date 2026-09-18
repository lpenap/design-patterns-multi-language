"""Decorator: attach responsibilities to an object dynamically by wrapping it."""

from typing import Protocol

from patterns.runtime.contract import Output


class Component(Protocol):
    """The interface shared by objects that can have responsibilities added."""

    def operation(self) -> str: ...


class ConcreteComponent:
    """The object being decorated."""

    def operation(self) -> str:
        return "ConcreteComponent"


class Decorator:
    """Holds the wrapped component and forwards to it; subclasses add behaviour."""

    def __init__(self, component: Component) -> None:
        self._component = component

    def operation(self) -> str:
        return self._component.operation()


class ConcreteDecoratorA(Decorator):
    def operation(self) -> str:
        return f"ConcreteDecoratorA({super().operation()})"


class ConcreteDecoratorB(Decorator):
    def operation(self) -> str:
        return f"ConcreteDecoratorB({super().operation()})"


class DecoratorExample:
    """The client: uses decorated and undecorated objects alike through Component."""

    id = "decorator"

    def run(self, out: Output) -> None:
        out.line("Executing Decorator Pattern Implementation")
        decorated: Component = ConcreteDecoratorA(ConcreteComponent())
        out.line(f"  {decorated.operation()}")
        twice: Component = ConcreteDecoratorB(decorated)
        out.line(f"  {twice.operation()}")


example = DecoratorExample()
