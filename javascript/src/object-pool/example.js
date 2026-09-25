import { ObjectPool } from "./object-pool.js";

function acquire(pool, task, out) {
  try {
    const reusable = pool.acquire(task);
    out.line(`  Task ${task} -> ${reusable} (use ${reusable.uses})`);
    return reusable;
  } catch (e) {
    out.line(`  Task ${task} -> ${e.message}`);
    return null;
  }
}

/** The client: acquires objects for tasks, releases them, and never constructs one itself. */
export const objectPoolExample = {
  id: "object-pool",
  run(out) {
    out.line("Executing Object Pool Pattern Implementation");
    const pool = new ObjectPool(2);
    const first = acquire(pool, "A", out);
    acquire(pool, "B", out);
    acquire(pool, "C", out);
    pool.release(first);
    out.line(`  Released ${first}`);
    acquire(pool, "C", out);
    out.line(`  Created ${pool.created} objects for 4 requests`);
  },
};
