import type { Subject } from "./subject.ts";

/** The expensive object the proxy stands in for. */
export class RealSubject implements Subject {
  request(): string {
    return "RealSubject.request()";
  }
}
