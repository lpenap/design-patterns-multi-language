/** All state is static; instances are ordinary objects that share it. */
export class Monostate {
  private static value = 0;

  getValue(): number {
    return Monostate.value;
  }

  setValue(value: number): void {
    Monostate.value = value;
  }
}
