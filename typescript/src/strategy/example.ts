import type { Example } from "../runtime/contract.ts";
import { ConcreteStrategyA, ConcreteStrategyB, Context } from "./strategy.ts";

/** The client: chooses the strategies and hands them to the context. */
export const strategyExample: Example = {
  id: "strategy",
  run(out) {
    out.line("Executing Strategy Pattern Implementation");
    const context = new Context(new ConcreteStrategyA());
    out.line(`  ${context.operation()}`);
    context.setStrategy(new ConcreteStrategyB());
    out.line(`  ${context.operation()}`);
  },
};
