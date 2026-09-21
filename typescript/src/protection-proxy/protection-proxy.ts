import type { Subject } from "./subject.ts";

/** Checks the caller's role before forwarding to the subject. */
export class ProtectionProxy implements Subject {
  constructor(
    private readonly subject: Subject,
    private readonly role: string,
  ) {}

  request(): string {
    return this.role === "admin" ? this.subject.request() : "access denied by ProtectionProxy";
  }
}
