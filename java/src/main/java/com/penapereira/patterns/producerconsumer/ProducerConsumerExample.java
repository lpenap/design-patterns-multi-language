package com.penapereira.patterns.producerconsumer;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.stream.Collectors;

/** The coordinator: runs one producer and two consumers, then reports what never varies. */
public final class ProducerConsumerExample implements Example {

    private static final int CAPACITY = 2;
    private static final int CONSUMERS = 2;
    private static final List<Integer> ITEMS = List.of(1, 2, 3, 4, 5);

    @Override
    public String id() {
        return "producer-consumer";
    }

    @Override
    public void run(Output out) throws InterruptedException {
        out.line("Executing Producer/Consumer Pattern Implementation");
        out.line("  Buffer capacity " + CAPACITY + ", 1 producer, " + CONSUMERS + " consumers");

        BoundedBuffer<Integer> buffer = new BoundedBuffer<>(CAPACITY);
        Collection<Integer> consumed = new ConcurrentLinkedQueue<>();
        List<Thread> consumers = new ArrayList<>();
        for (int i = 0; i < CONSUMERS; i++) {
            consumers.add(Thread.ofPlatform().start(new Consumer(buffer, consumed)));
        }
        Thread producer = Thread.ofPlatform().start(new Producer(buffer, ITEMS));

        producer.join();
        for (int i = 0; i < CONSUMERS; i++) {
            buffer.put(Consumer.POISON_PILL);
        }
        for (Thread consumer : consumers) {
            consumer.join();
        }

        List<Integer> sorted = consumed.stream().sorted().toList();
        out.line("  Produced: " + join(ITEMS));
        out.line("  Consumed: " + join(sorted));
        out.line("  Each item consumed exactly once: " + sorted.equals(ITEMS));
    }

    private static String join(List<Integer> values) {
        return values.stream().map(String::valueOf).collect(Collectors.joining(" "));
    }
}
