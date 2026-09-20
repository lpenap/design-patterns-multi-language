import type { Example } from "../runtime/contract.ts";
import type { Component } from "./component.ts";
import { ConcreteComponent } from "./concrete-component.ts";
import { ConcreteDecoratorA } from "./concrete-decorator-a.ts";
import { ConcreteDecoratorB } from "./concrete-decorator-b.ts";

/** The client: uses decorated and undecorated objects alike through Component. */
export const decoratorExample: Example = {
  id: "decorator",
  run(out) {
    out.line("Executing Decorator Pattern Implementation");
    const decorated: Component = new ConcreteDecoratorA(new ConcreteComponent());
    out.line(`  ${decorated.operation()}`);
    const twice: Component = new ConcreteDecoratorB(decorated);
    out.line(`  ${twice.operation()}`);
  },
};
