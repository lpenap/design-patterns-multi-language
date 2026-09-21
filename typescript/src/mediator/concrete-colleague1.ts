import { Colleague } from "./colleague.ts";

export class ConcreteColleague1 extends Colleague {
  name(): string {
    return "ConcreteColleague1";
  }
}
