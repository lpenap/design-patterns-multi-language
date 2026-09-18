import { describe, expect, it } from "vitest";
import { disagreeingLanguages, firstDifference } from "./compare.ts";

describe("firstDifference", () => {
  it("returns null for identical text", () => {
    expect(firstDifference("a\nb\n", "a\nb\n")).toBeNull();
  });
  it("names the first differing line", () => {
    expect(firstDifference("a\nb\n", "a\nc\n")).toEqual({ line: 2, expected: "b", actual: "c" });
  });
  it("handles a missing trailing line", () => {
    expect(firstDifference("a\nb\n", "a\n")).toEqual({ line: 2, expected: "b", actual: "" });
    expect(firstDifference("a\n", "a\nb\n")).toEqual({ line: 2, expected: "", actual: "b" });
  });
  it("treats trailing whitespace as a difference", () => {
    expect(firstDifference("a\n", "a \n")).toEqual({ line: 1, expected: "a", actual: "a " });
  });
});

describe("disagreeingLanguages", () => {
  it("is empty when all agree or there is nothing", () => {
    expect(disagreeingLanguages(new Map())).toEqual([]);
    expect(disagreeingLanguages(new Map([["a", "x"], ["b", "x"]]))).toEqual([]);
  });
  it("lists the reference first, then the others that differ", () => {
    expect(disagreeingLanguages(new Map([["a", "x"], ["b", "y"], ["c", "x"], ["d", "z"]]))).toEqual(["a", "b", "d"]);
  });
});
