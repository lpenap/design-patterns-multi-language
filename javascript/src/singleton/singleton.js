// Singleton: one instance, reached through a class operation.
//
// Constructors cannot be private in JavaScript; the instance is kept in a
// private static field so at least the storage is hidden. Textbook lazy
// initialisation, safe on the single-threaded event loop.

export class Singleton {
  static #uniqueInstance;

  static instance() {
    Singleton.#uniqueInstance ??= new Singleton();
    return Singleton.#uniqueInstance;
  }

  doSomething() {
    return "Singleton is doing something";
  }
}
