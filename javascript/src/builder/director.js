/** Owns the sequence of construction steps; knows nothing of the representation. */
export class Director {
  construct(builder) {
    builder.buildPartA();
    builder.buildPartB();
    return builder.getResult();
  }
}
