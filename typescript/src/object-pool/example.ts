import type { Example, Output } from "../runtime/contract.ts";
import { ObjectPool } from "./object-pool.ts";
import type { Reusable } from "./reusable.ts";

function acquire(pool: ObjectPool, task: string, out: Output): Reusable | null {
  try {
    const reusable = pool.acquire(task);
    out.line(`  Task ${task} -> ${reusable.toString()} (use ${String(reusable.uses)})`);
    return reusable;
  } catch (e: unknown) {
    out.line(`  Task ${task} -> ${e instanceof Error ? e.message : String(e)}`);
    return null;
  }
}

/** The client: acquires objects for tasks, releases them, and never constructs one itself. */
export const objectPoolExample: Example = {
  id: "object-pool",
  run(out) {
    out.line("Executing Object Pool Pattern Implementation");
    const pool = new ObjectPool(2);
    const first = acquire(pool, "A", out);
    acquire(pool, "B", out);
    acquire(pool, "C", out);
    if (first !== null) {
      pool.release(first);
      out.line(`  Released ${first.toString()}`);
    }
    acquire(pool, "C", out);
    out.line(`  Created ${String(pool.created)} objects for 4 requests`);
  },
};
