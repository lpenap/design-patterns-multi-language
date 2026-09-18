package com.penapereira.patterns.singleton;

/**
 * The sole instance is created on first use. Textbook lazy initialisation:
 * not thread-safe; see the pattern document for the alternatives.
 */
public final class Singleton {

    private static Singleton uniqueInstance;

    private Singleton() {
    }

    public static Singleton instance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Singleton();
        }
        return uniqueInstance;
    }

    public String doSomething() {
        return "Singleton is doing something";
    }
}
