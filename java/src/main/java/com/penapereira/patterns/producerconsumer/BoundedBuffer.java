package com.penapereira.patterns.producerconsumer;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

/**
 * A monitor: one lock, a "not full" and a "not empty" condition. This is what
 * java.util.concurrent.ArrayBlockingQueue does internally.
 */
public final class BoundedBuffer<T> {

    private final int capacity;
    private final Deque<T> items = new ArrayDeque<>();
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    public BoundedBuffer(int capacity) {
        this.capacity = capacity;
    }

    /** Waits while the buffer is full, then appends the item. */
    public void put(T item) throws InterruptedException {
        lock.lock();
        try {
            while (items.size() == capacity) {
                notFull.await();
            }
            items.addLast(item);
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    /** Waits while the buffer is empty, then removes the oldest item. */
    public T take() throws InterruptedException {
        lock.lock();
        try {
            while (items.isEmpty()) {
                notEmpty.await();
            }
            T item = items.removeFirst();
            notFull.signal();
            return item;
        } finally {
            lock.unlock();
        }
    }

    public int size() {
        lock.lock();
        try {
            return items.size();
        } finally {
            lock.unlock();
        }
    }
}
