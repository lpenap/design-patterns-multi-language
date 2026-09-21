// Producer/Consumer with cooperative tasks. JavaScript has no shared-memory
// threads in one realm, so `put` and `take` are generators that yield only
// when they would block, and a round-robin scheduler drives the tasks. Same
// wait/signal discipline as a monitor, without preemption, fully deterministic.

/** A sentinel item that tells one consumer to stop. */
export const POISON_PILL = -1;
