import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { iteratorExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    iteratorExample.run(out);
    expect(iteratorExample.id).toBe("iterator");
    expect(out.lines).toEqual([
      "Executing Iterator Pattern Implementation",
      "  ConcreteIterator traversal: a b c",
      "  Two iterators are independent: first.next()=a, second.next()=a",
    ]);
  });
});
