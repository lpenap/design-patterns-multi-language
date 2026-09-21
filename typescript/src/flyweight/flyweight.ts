/** Receives extrinsic state and acts on it together with its intrinsic state. */
export interface Flyweight {
  operation(extrinsicState: number): string;
}
