import { describe, expect, it } from "vitest";
import { ObjectPool } from "./object-pool.ts";

describe("ObjectPool", () => {
  it("creates objects lazily up to capacity", () => {
    const pool = new ObjectPool(2);
    expect(pool.created).toBe(0);
    const first = pool.acquire("a");
    const second = pool.acquire("b");
    expect(first).not.toBe(second);
    expect([first.id, second.id]).toEqual([1, 2]);
    expect([pool.created, pool.inUse, pool.available]).toEqual([2, 2, 0]);
  });

  it("refuses when exhausted", () => {
    const pool = new ObjectPool(1);
    pool.acquire("a");
    expect(() => pool.acquire("b")).toThrow("pool exhausted, 1 of 1 in use");
  });

  it("reuses released objects in FIFO order", () => {
    const pool = new ObjectPool(3);
    const first = pool.acquire("a");
    const second = pool.acquire("b");
    pool.release(second);
    pool.release(first);
    expect(pool.acquire("c")).toBe(second);
    expect(pool.acquire("d")).toBe(first);
    expect(pool.created).toBe(2);
    expect(first.uses).toBe(2);
  });

  it("release resets the object", () => {
    const pool = new ObjectPool(1);
    const reusable = pool.acquire("a");
    expect(reusable.task).toBe("a");
    pool.release(reusable);
    expect(reusable.task).toBeNull();
    expect([pool.available, pool.inUse]).toEqual([1, 0]);
  });

  it("rejects releasing an object that is not in use", () => {
    const pool = new ObjectPool(1);
    const reusable = pool.acquire("a");
    pool.release(reusable);
    expect(() => {
      pool.release(reusable);
    }).toThrow("Reusable#1 is not in use");
  });

  it("rejects a non-positive capacity", () => {
    expect(() => new ObjectPool(0)).toThrow("capacity must be positive: 0");
    expect(new ObjectPool(4).capacity).toBe(4);
  });
});
