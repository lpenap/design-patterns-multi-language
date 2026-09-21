import { NegativeHandler } from "./negative-handler.js";
import { PositiveHandler } from "./positive-handler.js";
import { ZeroHandler } from "./zero-handler.js";

/** The client: assembles the chain and sends requests to its first link. */
export const chainOfResponsibilityExample = {
  id: "chain-of-responsibility",
  run(out) {
    out.line("Executing Chain of Responsibility Pattern Implementation");
    const chain = new NegativeHandler();
    chain.setNext(new ZeroHandler()).setNext(new PositiveHandler());
    for (const request of [-1, 0, 1]) {
      out.line(`  ${request} is ${chain.handle(request)}`);
    }
  },
};
