// Adapter (object form): convert an interface into the one the client expects.
// A target is any object with `request()`.

/** An existing class with a useful but incompatible operation. */
export class Adaptee {
  specificRequest() {
    return "Adaptee";
  }
}
