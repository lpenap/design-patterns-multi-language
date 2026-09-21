// State: let an object alter its behaviour when its internal state changes.
// A state is any object with handle(context) and name().

import { ConcreteStateB } from "./concrete-state-b.js";

export class ConcreteStateA {
  handle(context) {
    context.setState(new ConcreteStateB());
  }

  name() {
    return "ConcreteStateA";
  }
}
