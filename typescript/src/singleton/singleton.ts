/**
 * The sole instance is created on first use. Textbook lazy initialisation;
 * safe here because JavaScript runs one thread per realm.
 */
export class Singleton {
  private static uniqueInstance: Singleton | undefined;

  private constructor() {
    // Hidden: the only way in is instance().
  }

  static instance(): Singleton {
    Singleton.uniqueInstance ??= new Singleton();
    return Singleton.uniqueInstance;
  }

  doSomething(): string {
    return "Singleton is doing something";
  }
}
