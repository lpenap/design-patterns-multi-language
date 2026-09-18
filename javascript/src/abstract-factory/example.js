import { ConcreteFactory1, ConcreteFactory2 } from "./abstract-factory.js";

function useFamily(factory, out) {
  out.line(`  ${factory.createProductA().name()}`);
  out.line(`  ${factory.createProductB().name()}`);
}

/** The client: knows the factories only by their methods. */
export const abstractFactoryExample = {
  id: "abstract-factory",
  run(out) {
    out.line("Executing Abstract Factory Pattern Implementation");
    useFamily(new ConcreteFactory1(), out);
    useFamily(new ConcreteFactory2(), out);
  },
};
