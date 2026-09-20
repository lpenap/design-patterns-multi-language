import { ConcreteColleague1, ConcreteColleague2, ConcreteMediator } from "./mediator.js";

function exchange(sender, receiver, message, out) {
  sender.send(message);
  out.line(`  ${sender.name()} sends: ${message}`);
  out.line(`  ${receiver.name()} receives: ${receiver.received().at(-1)}`);
}

/** The client: wires colleagues to the mediator and triggers messages. */
export const mediatorExample = {
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
