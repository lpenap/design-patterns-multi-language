// Monostate: ordinary instances that share all their state.

/** All state is static (and private to the class); instances are ordinary objects that share it. */
export class Monostate {
  static #value = 0;

  getValue() {
    return Monostate.#value;
  }

  setValue(value) {
    Monostate.#value = value;
  }
}
