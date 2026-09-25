package com.penapereira.patterns.objectpool;

/**
 * The pooled object: expensive to create, cheap to reset. It records the task
 * it is assigned to and how many times it has been handed out.
 */
public final class Reusable {

    private final int id;
    private String task;
    private int uses;

    Reusable(int id) {
        this.id = id;
    }

    public int id() {
        return id;
    }

    /** The task this object currently serves, or null while it sits in the pool. */
    public String task() {
        return task;
    }

    /** How many times the pool has handed this object out. */
    public int uses() {
        return uses;
    }

    void assign(String task) {
        this.task = task;
        uses++;
    }

    /** Clears the per-use state so the next client starts from a clean object. */
    void reset() {
        task = null;
    }

    @Override
    public String toString() {
        return "Reusable#" + id;
    }
}
