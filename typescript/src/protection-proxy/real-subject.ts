import type { Subject } from "./subject.ts";

/** The object the proxy represents. */
export class RealSubject implements Subject {
  request(): string {
    return "RealSubject.request()";
  }
}
