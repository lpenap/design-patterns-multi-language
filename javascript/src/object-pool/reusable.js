/**
 * The pooled object: expensive to create, cheap to reset. It records the task
 * it is assigned to and how many times it has been handed out; `assign` and
 * `reset` are for the pool only.
 */
export class Reusable {
  #id;
  #task = null;
  #uses = 0;

  constructor(id) {
    this.#id = id;
  }

  get id() {
    return this.#id;
  }

  /** The task this object currently serves, or null while it sits in the pool. */
  get task() {
    return this.#task;
  }

  /** How many times the pool has handed this object out. */
  get uses() {
    return this.#uses;
  }

  assign(task) {
    this.#task = task;
    this.#uses += 1;
  }

  /** Clears the per-use state so the next client starts from a clean object. */
  reset() {
    this.#task = null;
  }

  toString() {
    return `Reusable#${this.#id}`;
  }
}
