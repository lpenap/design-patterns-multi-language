import type { Example } from "../runtime/contract.ts";
import type { Handler } from "./handler.ts";
import { NegativeHandler } from "./negative-handler.ts";
import { PositiveHandler } from "./positive-handler.ts";
import { ZeroHandler } from "./zero-handler.ts";

/** The client: assembles the chain and sends requests to its first link. */
export const chainOfResponsibilityExample: Example = {
  id: "chain-of-responsibility",
  run(out) {
    out.line("Executing Chain of Responsibility Pattern Implementation");
    const chain: Handler = new NegativeHandler();
    chain.setNext(new ZeroHandler()).setNext(new PositiveHandler());
    for (const request of [-1, 0, 1]) {
      out.line(`  ${String(request)} is ${chain.handle(request)}`);
    }
  },
};
