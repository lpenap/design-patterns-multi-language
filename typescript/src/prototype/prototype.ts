/** Declares the interface for cloning itself. */
export interface Prototype {
  clone(): Prototype;
  describe(): string;
}
