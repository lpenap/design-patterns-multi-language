/** Holds a strategy and delegates to it; the strategy can be replaced at run time. */
export class Context {
  #strategy;

  constructor(strategy) {
    this.#strategy = strategy;
  }

  operation() {
    return `Operation with ${this.#strategy.executeAlgorithm()}`;
  }

  setStrategy(strategy) {
    this.#strategy = strategy;
  }
}
