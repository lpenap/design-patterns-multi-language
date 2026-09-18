package com.penapereira.patterns.runtime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;
import java.util.SortedMap;
import org.junit.jupiter.api.Test;

class ExamplesTest {

    @Test
    void discoversFixturesFromTestClassPathSortedById() {
        SortedMap<String, Example> found = Examples.discover();
        List<String> fixtures = found.keySet().stream().filter(id -> id.startsWith("fixture-")).toList();
        assertEquals(List.of("fixture-alpha", "fixture-beta", "fixture-failing"), fixtures);
        assertEquals(List.copyOf(found.keySet()).stream().sorted().toList(), List.copyOf(found.keySet()));
    }

    @Test
    void indexSortsById() {
        SortedMap<String, Example> found =
                Examples.index(List.of(new FixtureBetaExample(), new FixtureAlphaExample()));
        assertEquals(List.of("fixture-alpha", "fixture-beta"), List.copyOf(found.keySet()));
    }

    @Test
    void indexRejectsDuplicateIds() {
        IllegalStateException e = assertThrows(IllegalStateException.class,
                () -> Examples.index(List.of(new FixtureAlphaExample(), new FixtureAlphaExample())));
        assertEquals("duplicate example id: fixture-alpha", e.getMessage());
    }

    @Test
    void fixtureWritesThroughOutput() {
        BufferOutput out = new BufferOutput();
        new FixtureAlphaExample().run(out);
        assertEquals(List.of("Executing Fixture Alpha Pattern Implementation", "  first", "  second"),
                out.lines);
    }
}
