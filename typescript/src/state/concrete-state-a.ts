import { ConcreteStateB } from "./concrete-state-b.ts";
import type { Context } from "./context.ts";
import type { State } from "./state.ts";

export class ConcreteStateA implements State {
  handle(context: Context): void {
    context.setState(new ConcreteStateB());
  }

  name(): string {
    return "ConcreteStateA";
  }
}
