package com.penapereira.patterns.producerconsumer;

import java.util.List;

/** Puts its items into the buffer in order; put() waits while the buffer is full. */
public final class Producer implements Runnable {

    private final BoundedBuffer<Integer> buffer;
    private final List<Integer> items;

    public Producer(BoundedBuffer<Integer> buffer, List<Integer> items) {
        this.buffer = buffer;
        this.items = items;
    }

    @Override
    public void run() {
        try {
            for (int item : items) {
                buffer.put(item);
            }
        } catch (InterruptedException stop) {
            Thread.currentThread().interrupt();
        }
    }
}
