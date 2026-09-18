package com.penapereira.patterns.producerconsumer;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Duration;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;

@Timeout(value = 5, unit = TimeUnit.SECONDS)
class BoundedBufferTest {

    @Test
    void isFirstInFirstOut() throws InterruptedException {
        BoundedBuffer<String> buffer = new BoundedBuffer<>(3);
        buffer.put("a");
        buffer.put("b");
        assertEquals(2, buffer.size());
        assertEquals("a", buffer.take());
        assertEquals("b", buffer.take());
        assertEquals(0, buffer.size());
    }

    @Test
    void putWaitsWhileFullUntilATake() throws InterruptedException {
        BoundedBuffer<Integer> buffer = new BoundedBuffer<>(1);
        buffer.put(1);
        CountDownLatch done = new CountDownLatch(1);
        Thread producer = Thread.ofPlatform().start(() -> {
            try {
                buffer.put(2);
                done.countDown();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        assertFalse(done.await(100, TimeUnit.MILLISECONDS), "put must block while the buffer is full");
        assertEquals(1, buffer.take());
        assertTrue(done.await(1, TimeUnit.SECONDS));
        assertEquals(2, buffer.take());
        producer.join();
    }

    @Test
    void takeWaitsWhileEmptyUntilAPut() throws InterruptedException {
        BoundedBuffer<Integer> buffer = new BoundedBuffer<>(1);
        ConcurrentLinkedQueue<Integer> taken = new ConcurrentLinkedQueue<>();
        Thread consumer = Thread.ofPlatform().start(() -> {
            try {
                taken.add(buffer.take());
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        Thread.sleep(Duration.ofMillis(100));
        assertTrue(taken.isEmpty(), "take must block while the buffer is empty");
        buffer.put(7);
        consumer.join();
        assertEquals(List.of(7), List.copyOf(taken));
    }

    @Test
    void blockedProducerAndConsumerStopWhenInterrupted() throws InterruptedException {
        BoundedBuffer<Integer> full = new BoundedBuffer<>(1);
        full.put(0);
        Thread producer = Thread.ofPlatform().start(new Producer(full, List.of(1)));
        Thread consumer = Thread.ofPlatform().start(new Consumer(new BoundedBuffer<>(1), new ConcurrentLinkedQueue<>()));
        Thread.sleep(Duration.ofMillis(50));
        producer.interrupt();
        consumer.interrupt();
        producer.join();
        consumer.join();
        assertEquals(1, full.size());
    }
}
