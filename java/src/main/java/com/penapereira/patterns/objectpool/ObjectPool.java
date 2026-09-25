package com.penapereira.patterns.objectpool;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Lends out up to {@code capacity} reusable objects, creating each one only on
 * first demand and recycling released ones in FIFO order.
 */
public final class ObjectPool {

    private final int capacity;
    private final Deque<Reusable> available = new ArrayDeque<>();
    private final Set<Reusable> inUse = new LinkedHashSet<>();
    private int created;

    public ObjectPool(int capacity) {
        if (capacity < 1) {
            throw new IllegalArgumentException("capacity must be positive: " + capacity);
        }
        this.capacity = capacity;
    }

    /**
     * Hands out an idle object, or a new one while the pool is below capacity.
     *
     * @throws IllegalStateException when every object is in use
     */
    public Reusable acquire(String task) {
        Reusable reusable = available.pollFirst();
        if (reusable == null) {
            if (created == capacity) {
                throw new IllegalStateException("pool exhausted, " + inUse.size() + " of " + capacity + " in use");
            }
            created++;
            reusable = new Reusable(created);
        }
        reusable.assign(task);
        inUse.add(reusable);
        return reusable;
    }

    /**
     * Takes an object back, resets it and makes it available again.
     *
     * @throws IllegalArgumentException when the object was not lent out by this pool
     */
    public void release(Reusable reusable) {
        if (!inUse.remove(reusable)) {
            throw new IllegalArgumentException(reusable + " is not in use");
        }
        reusable.reset();
        available.addLast(reusable);
    }

    public int capacity() {
        return capacity;
    }

    public int created() {
        return created;
    }

    public int available() {
        return available.size();
    }

    public int inUse() {
        return inUse.size();
    }
}
