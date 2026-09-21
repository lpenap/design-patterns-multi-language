import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { mediatorExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    mediatorExample.run(out);
    expect(mediatorExample.id).toBe("mediator");
    expect(out.lines).toEqual([
      "Executing Mediator Pattern Implementation",
      "  ConcreteColleague1 sends: hello",
      "  ConcreteColleague2 receives: hello",
      "  ConcreteColleague2 sends: hi",
      "  ConcreteColleague1 receives: hi",
    ]);
  });
});
