/** The complex object under construction. */
export class Product {
  private readonly parts: string[] = [];

  add(part: string): void {
    this.parts.push(part);
  }

  describe(): string {
    return `Product(${this.parts.join(", ")})`;
  }
}
