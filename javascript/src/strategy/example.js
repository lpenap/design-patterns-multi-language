import { ConcreteStrategyA } from "./concrete-strategy-a.js";
import { ConcreteStrategyB } from "./concrete-strategy-b.js";
import { Context } from "./context.js";

/** The client: chooses the strategies and hands them to the context. */
export const strategyExample = {
  id: "strategy",
  run(out) {
    out.line("Executing Strategy Pattern Implementation");
    const context = new Context(new ConcreteStrategyA());
    out.line(`  ${context.operation()}`);
    context.setStrategy(new ConcreteStrategyB());
    out.line(`  ${context.operation()}`);
  },
};
