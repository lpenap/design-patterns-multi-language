import { ConcreteStateA } from "./concrete-state-a.ts";
import type { Context } from "./context.ts";
import type { State } from "./state.ts";

export class ConcreteStateB implements State {
  handle(context: Context): void {
    context.setState(new ConcreteStateA());
  }

  name(): string {
    return "ConcreteStateB";
  }
}
