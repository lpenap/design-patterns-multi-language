import { ConcreteComponent } from "./concrete-component.js";
import { ConcreteDecoratorA } from "./concrete-decorator-a.js";
import { ConcreteDecoratorB } from "./concrete-decorator-b.js";

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
