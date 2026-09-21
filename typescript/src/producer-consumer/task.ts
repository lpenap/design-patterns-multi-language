/**
 * Producer/Consumer with cooperative tasks. JavaScript has no shared-memory
 * threads in one realm, so `put` and `take` are generators that yield only
 * when they would block, and a round-robin scheduler drives the tasks. Same
 * wait/signal discipline as a monitor, without preemption, fully deterministic.
 */
/** A task yields whenever it would block; it is done when its generator returns. */
export type Task = Generator<void, void, undefined>;
