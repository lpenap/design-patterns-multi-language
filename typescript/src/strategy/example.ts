import type { Example } from "../runtime/contract.ts";
import { ConcreteStrategyA } from "./concrete-strategy-a.ts";
import { ConcreteStrategyB } from "./concrete-strategy-b.ts";
import { Context } from "./context.ts";

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
