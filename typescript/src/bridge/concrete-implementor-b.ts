import type { Implementor } from "./implementor.ts";

export class ConcreteImplementorB implements Implementor {
  operationImpl(): string {
    return "ConcreteImplementorB";
  }
}
