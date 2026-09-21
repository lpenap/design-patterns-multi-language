/** Knows how to perform the operations associated with a request. */
export class Receiver {
  private readonly words: string[] = [];

  action(word: string): void {
    this.words.push(word);
  }

  reverse(word: string): void {
    const last = this.words.lastIndexOf(word);
    if (last >= 0) {
      this.words.splice(last, 1);
    }
  }

  getState(): string {
    return this.words.join(" ");
  }
}
