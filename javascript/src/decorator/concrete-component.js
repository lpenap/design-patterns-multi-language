// Decorator: attach responsibilities to an object dynamically by wrapping it.
// A component is any object with `operation()`.

/** The object being decorated. */
export class ConcreteComponent {
  operation() {
    return "ConcreteComponent";
  }
}
