import type { Example, Output } from "../runtime/contract.ts";
import { type Colleague, ConcreteColleague1, ConcreteColleague2, ConcreteMediator } from "./mediator.ts";

function exchange(sender: Colleague, receiver: Colleague, message: string, out: Output): void {
  sender.send(message);
  out.line(`  ${sender.name()} sends: ${message}`);
  out.line(`  ${receiver.name()} receives: ${receiver.received().at(-1) ?? ""}`);
}

/** The client: wires colleagues to the mediator and triggers messages. */
export const mediatorExample: Example = {
  id: "mediator",
  run(out) {
    out.line("Executing Mediator Pattern Implementation");
    const mediator = new ConcreteMediator();
    const one = new ConcreteColleague1(mediator);
    const two = new ConcreteColleague2(mediator);
    mediator.setColleague1(one);
    mediator.setColleague2(two);
    exchange(one, two, "hello", out);
    exchange(two, one, "hi", out);
  },
};
