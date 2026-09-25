package com.penapereira.patterns.objectpool;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: acquires objects for tasks, releases them, and never constructs one itself. */
public final class ObjectPoolExample implements Example {

    @Override
    public String id() {
        return "object-pool";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Object Pool Pattern Implementation");
        ObjectPool pool = new ObjectPool(2);
        Reusable first = acquire(pool, "A", out);
        acquire(pool, "B", out);
        acquire(pool, "C", out);
        pool.release(first);
        out.line("  Released " + first);
        acquire(pool, "C", out);
        out.line("  Created " + pool.created() + " objects for 4 requests");
    }

    private static Reusable acquire(ObjectPool pool, String task, Output out) {
        try {
            Reusable reusable = pool.acquire(task);
            out.line("  Task " + task + " -> " + reusable + " (use " + reusable.uses() + ")");
            return reusable;
        } catch (IllegalStateException e) {
            out.line("  Task " + task + " -> " + e.getMessage());
            return null;
        }
    }
}
