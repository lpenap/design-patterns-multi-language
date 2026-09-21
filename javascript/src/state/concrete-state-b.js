import { ConcreteStateA } from "./concrete-state-a.js";

export class ConcreteStateB {
  handle(context) {
    context.setState(new ConcreteStateA());
  }

  name() {
    return "ConcreteStateB";
  }
}
