import { Decorator } from "./decorator.ts";

export class ConcreteDecoratorA extends Decorator {
  override operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}
