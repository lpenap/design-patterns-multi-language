import { ConcreteObserver } from "./concrete-observer.js";
import { ConcreteSubject } from "./concrete-subject.js";

/** The client: wires subject and observers and drives the changes. */
export const observerExample = {
  id: "observer",
  run(out) {
    out.line("Executing Observer Pattern Implementation");
    const subject = new ConcreteSubject();
    const observer1 = new ConcreteObserver("observer1", (text) => out.line(`  ${text}`));
    const observer2 = new ConcreteObserver("observer2", (text) => out.line(`  ${text}`));
    subject.attach(observer1);
    subject.attach(observer2);
    subject.setState(5);
    subject.detach(observer2);
    subject.setState(10);
  },
};
