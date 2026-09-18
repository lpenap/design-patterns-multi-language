package com.penapereira.patterns.producerconsumer;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;

@Timeout(value = 5, unit = TimeUnit.SECONDS)
class ProducerConsumerExampleTest {

    @Test
    void everyItemIsConsumedExactlyOnceAndConsumersStopOnThePoisonPill() throws InterruptedException {
        BoundedBuffer<Integer> buffer = new BoundedBuffer<>(2);
        ConcurrentLinkedQueue<Integer> consumed = new ConcurrentLinkedQueue<>();
        Thread c1 = Thread.ofPlatform().start(new Consumer(buffer, consumed));
        Thread c2 = Thread.ofPlatform().start(new Consumer(buffer, consumed));
        Thread p = Thread.ofPlatform().start(new Producer(buffer, List.of(10, 20, 30, 40)));
        p.join();
        buffer.put(Consumer.POISON_PILL);
        buffer.put(Consumer.POISON_PILL);
        c1.join();
        c2.join();
        assertEquals(List.of(10, 20, 30, 40), consumed.stream().sorted().toList());
        assertEquals(0, buffer.size());
    }

    @RepeatedTest(5)
    void printsTheSameLinesOnEveryRun() throws Exception {
        ProducerConsumerExample example = new ProducerConsumerExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("producer-consumer", example.id());
        assertEquals(List.of("Executing Producer/Consumer Pattern Implementation",
                "  Buffer capacity 2, 1 producer, 2 consumers",
                "  Produced: 1 2 3 4 5",
                "  Consumed: 1 2 3 4 5",
                "  Each item consumed exactly once: true"), lines);
    }
}
