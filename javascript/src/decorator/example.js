import { ConcreteComponent, ConcreteDecoratorA, ConcreteDecoratorB } from "./decorator.js";

/** The client: uses decorated and undecorated objects alike through `operation()`. */
export const decoratorExample = {
  id: "decorator",
  run(out) {
    out.line("Executing Decorator Pattern Implementation");
    const decorated = new ConcreteDecoratorA(new ConcreteComponent());
    out.line(`  ${decorated.operation()}`);
    const twice = new ConcreteDecoratorB(decorated);
    out.line(`  ${twice.operation()}`);
  },
};
