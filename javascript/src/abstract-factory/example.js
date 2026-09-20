import { ConcreteFactory1 } from "./concrete-factory1.js";
import { ConcreteFactory2 } from "./concrete-factory2.js";

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
