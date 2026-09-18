import type { Example, Output } from "../runtime/contract.ts";
import { type AbstractFactory, ConcreteFactory1, ConcreteFactory2 } from "./abstract-factory.ts";

function useFamily(factory: AbstractFactory, out: Output): void {
  out.line(`  ${factory.createProductA().name()}`);
  out.line(`  ${factory.createProductB().name()}`);
}

/** The client: uses only the abstract factory and abstract product types. */
export const abstractFactoryExample: Example = {
  id: "abstract-factory",
  run(out) {
    out.line("Executing Abstract Factory Pattern Implementation");
    useFamily(new ConcreteFactory1(), out);
    useFamily(new ConcreteFactory2(), out);
  },
};
