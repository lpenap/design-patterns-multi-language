import { Decorator } from "./decorator.ts";

export class ConcreteDecoratorB extends Decorator {
  override operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}
