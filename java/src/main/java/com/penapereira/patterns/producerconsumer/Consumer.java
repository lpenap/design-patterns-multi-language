package com.penapereira.patterns.producerconsumer;

import java.util.Collection;

/** Takes items until it takes the poison pill; take() waits while the buffer is empty. */
public final class Consumer implements Runnable {

    /** A sentinel item that tells one consumer to stop. */
    public static final int POISON_PILL = -1;

    private final BoundedBuffer<Integer> buffer;
    private final Collection<Integer> consumed;

    public Consumer(BoundedBuffer<Integer> buffer, Collection<Integer> consumed) {
        this.buffer = buffer;
        this.consumed = consumed;
    }

    @Override
    public void run() {
        try {
            for (int item = buffer.take(); item != POISON_PILL; item = buffer.take()) {
                consumed.add(item);
            }
        } catch (InterruptedException stop) {
            Thread.currentThread().interrupt();
        }
    }
}
