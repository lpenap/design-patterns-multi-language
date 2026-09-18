// Strategy: a family of interchangeable algorithms behind one interface.
//
// There is no interface construct in JavaScript: a strategy is any object
// with an `executeAlgorithm()` method, and `Context` simply calls it.

export class ConcreteStrategyA {
  executeAlgorithm() {
    return "--> algorithm from ConcreteStrategyA";
  }
}

export class ConcreteStrategyB {
  executeAlgorithm() {
    return "==> algorithm from ConcreteStrategyB";
  }
}

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
