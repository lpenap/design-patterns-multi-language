// Strategy: a family of interchangeable algorithms behind one interface.
//
// There is no interface construct in JavaScript: a strategy is any object
// with an `executeAlgorithm()` method, and `Context` simply calls it.

export class ConcreteStrategyA {
  executeAlgorithm() {
    return "--> algorithm from ConcreteStrategyA";
  }
}
