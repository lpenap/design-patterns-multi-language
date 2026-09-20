import type { Implementor } from "./implementor.ts";

export class ConcreteImplementorA implements Implementor {
  operationImpl(): string {
    return "ConcreteImplementorA";
  }
}
