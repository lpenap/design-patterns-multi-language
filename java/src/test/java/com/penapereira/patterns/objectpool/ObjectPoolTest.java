package com.penapereira.patterns.objectpool;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotSame;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class ObjectPoolTest {

    @Test
    void createsObjectsLazilyUpToCapacity() {
        ObjectPool pool = new ObjectPool(2);
        assertEquals(0, pool.created());
        Reusable first = pool.acquire("a");
        Reusable second = pool.acquire("b");
        assertNotSame(first, second);
        assertEquals(1, first.id());
        assertEquals(2, second.id());
        assertEquals(2, pool.created());
        assertEquals(2, pool.inUse());
        assertEquals(0, pool.available());
    }

    @Test
    void refusesWhenExhausted() {
        ObjectPool pool = new ObjectPool(1);
        pool.acquire("a");
        IllegalStateException e = assertThrows(IllegalStateException.class, () -> pool.acquire("b"));
        assertEquals("pool exhausted, 1 of 1 in use", e.getMessage());
    }

    @Test
    void reusesReleasedObjectsInFifoOrder() {
        ObjectPool pool = new ObjectPool(3);
        Reusable first = pool.acquire("a");
        Reusable second = pool.acquire("b");
        pool.release(second);
        pool.release(first);
        assertSame(second, pool.acquire("c"));
        assertSame(first, pool.acquire("d"));
        assertEquals(2, pool.created());
        assertEquals(2, first.uses());
    }

    @Test
    void releaseResetsTheObject() {
        ObjectPool pool = new ObjectPool(1);
        Reusable reusable = pool.acquire("a");
        assertEquals("a", reusable.task());
        pool.release(reusable);
        assertNull(reusable.task());
        assertEquals(1, pool.available());
        assertEquals(0, pool.inUse());
    }

    @Test
    void rejectsReleasingAnObjectThatIsNotInUse() {
        ObjectPool pool = new ObjectPool(1);
        Reusable reusable = pool.acquire("a");
        pool.release(reusable);
        IllegalArgumentException e = assertThrows(IllegalArgumentException.class, () -> pool.release(reusable));
        assertEquals("Reusable#1 is not in use", e.getMessage());
    }

    @Test
    void rejectsANonPositiveCapacity() {
        assertThrows(IllegalArgumentException.class, () -> new ObjectPool(0));
    }
}
