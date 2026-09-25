import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ObjectPool } from "./object-pool.js";

describe("ObjectPool", () => {
  it("creates objects lazily up to capacity", () => {
    const pool = new ObjectPool(2);
    assert.equal(pool.created, 0);
    const first = pool.acquire("a");
    const second = pool.acquire("b");
    assert.notEqual(first, second);
    assert.deepEqual([first.id, second.id], [1, 2]);
    assert.deepEqual([pool.created, pool.inUse, pool.available], [2, 2, 0]);
  });

  it("refuses when exhausted", () => {
    const pool = new ObjectPool(1);
    pool.acquire("a");
    assert.throws(() => pool.acquire("b"), { message: "pool exhausted, 1 of 1 in use" });
  });

  it("reuses released objects in FIFO order", () => {
    const pool = new ObjectPool(3);
    const first = pool.acquire("a");
    const second = pool.acquire("b");
    pool.release(second);
    pool.release(first);
    assert.equal(pool.acquire("c"), second);
    assert.equal(pool.acquire("d"), first);
    assert.equal(pool.created, 2);
    assert.equal(first.uses, 2);
  });

  it("release resets the object", () => {
    const pool = new ObjectPool(1);
    const reusable = pool.acquire("a");
    assert.equal(reusable.task, "a");
    pool.release(reusable);
    assert.equal(reusable.task, null);
    assert.deepEqual([pool.available, pool.inUse], [1, 0]);
  });

  it("rejects releasing an object that is not in use", () => {
    const pool = new ObjectPool(1);
    const reusable = pool.acquire("a");
    pool.release(reusable);
    assert.throws(() => pool.release(reusable), { message: "Reusable#1 is not in use" });
  });

  it("rejects a non-positive capacity", () => {
    assert.throws(() => new ObjectPool(0), { message: "capacity must be positive: 0" });
    assert.equal(new ObjectPool(4).capacity, 4);
  });
});
