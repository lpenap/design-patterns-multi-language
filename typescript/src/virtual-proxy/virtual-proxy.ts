import type { Subject } from "./subject.ts";

/** Creates the real subject on the first request and forwards every request to it. */
export class VirtualProxy implements Subject {
  private realSubject: Subject | undefined;

  constructor(private readonly loader: () => Subject) {}

  request(): string {
    this.realSubject ??= this.loader();
    return this.realSubject.request();
  }

  isLoaded(): boolean {
    return this.realSubject !== undefined;
  }
}
