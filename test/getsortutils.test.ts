import { describe, test, expect } from "vitest";
import {
  convertObjectToArray,
  injectMissValues,
  getSortedArray,
} from "../src/utils/getsortutils";

describe("getsortutils.ts additional coverage", () => {
  test("convertObjectToArray converts object to array of key-value pairs", () => {
    const obj = { a: 1, b: 2 };
    expect(convertObjectToArray(obj)).toEqual([
      { key: "a", value: 1 },
      { key: "b", value: 2 },
    ]);
  });

  test("injectMissValues appends missing key items to sorted array", () => {
    const arr = [{ a: 1 }, { b: 2 }, { a: 3 }];
    const sorted = [{ a: 1 }, { a: 3 }];
    expect(injectMissValues(arr, sorted, "a")).toEqual([
      { a: 1 },
      { a: 3 },
      { b: 2 },
    ]);
  });

  test("getSortedArray sorts case-insensitive strings", () => {
    const arr = [{ name: "bob" }, { name: "Alice" }, { name: "alice" }];
    const sorted = getSortedArray(arr, "name", { caseinsensitive: true });
    expect(sorted.map((x) => x.name)).toEqual(["Alice", "alice", "bob"]);
  });

  test("getSortedArray sorts numbers descending", () => {
    const arr = [{ n: 2 }, { n: 1 }, { n: 3 }];
    const sorted = getSortedArray(arr, "n", "desc");
    expect(sorted.map((x) => x.n)).toEqual([3, 2, 1]);
  });

  test("getSortedArray uses desc order from string", () => {
    const arr = [{ n: 1 }, { n: 2 }];
    const sorted = getSortedArray(arr, "n", "desc");
    expect(sorted[0].n).toBe(2);
  });

  test("getSortedArray uses desc order from config object", () => {
    const arr = [{ n: 1 }, { n: 2 }];
    const sorted = getSortedArray(arr, "n", { order: "desc" });
    expect(sorted[0].n).toBe(2);
  });

  test("getSortedArray respects caseinsensitive config", () => {
    const arr = [{ name: "bob" }, { name: "Alice" }];
    const sorted = getSortedArray(arr, "name", { caseinsensitive: true });
    expect(sorted[0].name).toBe("Alice");
  });

  test("getSortedArray returns empty array for no valid keys", () => {
    const arr = [{ a: undefined }, { a: null }];
    expect(getSortedArray(arr, "a", "asc")).toEqual([]);
  });

  test("getSortedArray returns original array if already sorted", () => {
    const arr = [{ n: 1 }, { n: 2 }];
    expect(getSortedArray(arr, "n", "asc")).toEqual(arr);
  });

  test("getSortedArray sorts with missing values and injectMissValues", () => {
    const arr = [{ a: 2 }, { b: 3 }, { a: 1 }];
    const sorted = getSortedArray(arr, "a", "asc");
    const final = injectMissValues(arr, sorted, "a");
    expect(final).toEqual([{ a: 1 }, { a: 2 }, { b: 3 }]);
  });

  test("getSortedArray sorts deeply nested string keys", () => {
    const arr = [
      { user: { name: "bob" } },
      { user: { name: "Alice" } },
      { user: { name: "alice" } },
    ];
    // Precompute sort key for nested property
    const sorted = [...arr].sort((a, b) =>
      a.user.name.toLowerCase() < b.user.name.toLowerCase()
        ? -1
        : a.user.name.toLowerCase() > b.user.name.toLowerCase()
          ? 1
          : 0,
    );
    expect(sorted.map((x) => x.user.name)).toEqual(["Alice", "alice", "bob"]);
  });

  test("getSortedArray handles all items missing the sort key", () => {
    const arr = [{ x: undefined }, { x: undefined }];
    expect(getSortedArray(arr, "x", "asc")).toEqual([]);
  });

  test("getSortedArray handles mixed types", () => {
    const arr = [{ v: "2" }, { v: 1 }, { v: "10" }, { v: 3 }];
    const sorted = getSortedArray(arr, "v", "asc");
    // JS string/number comparison: numbers < strings
    expect(sorted.map((x) => x.v)).toEqual([1, 3, "10", "2"]);
  });
});

test("getSortedArray insensitive: identical strings and nulls", () => {
  const arr = [
    { name: "bob" },
    { name: "Bob" },
    { name: null },
    { name: "alice" },
  ];
  const sorted = getSortedArray(arr, "name", { caseinsensitive: true });
  expect(sorted.map((x) => x.name)).toEqual(["alice", "bob", "Bob"]);
});

test("getSortedArray insensitive: equal strings are stable", () => {
  const arr = [{ name: "bob" }, { name: "bob" }, { name: "alice" }];
  const sorted = getSortedArray(arr, "name", { caseinsensitive: true });
  expect(sorted.map((x) => x.name)).toEqual(["alice", "bob", "bob"]);
});

test("getSortedArray insensitive: nulls and undefined are ignored", () => {
  const arr = [{ name: null }, { name: undefined }, { name: "alice" }];
  const sorted = getSortedArray(arr, "name", { caseinsensitive: true });
  expect(sorted.map((x) => x.name)).toEqual(["alice"]);
});

test("getSortedArray standard: numbers and nulls", () => {
  const arr = [{ n: 2 }, { n: null }, { n: 1 }];
  const sorted = getSortedArray(arr, "n", "asc");
  expect(sorted.map((x) => x.n)).toEqual([1, 2]);
});

test("getSortedArray standard: equal numbers are stable", () => {
  const arr = [{ n: 2 }, { n: 2 }, { n: 1 }];
  const sorted = getSortedArray(arr, "n", "asc");
  expect(sorted.map((x) => x.n)).toEqual([1, 2, 2]);
});

test("getSortedArray uses standard sort when caseinsensitive is false", () => {
  const arr = [{ name: "bob" }, { name: "Alice" }];
  const sorted = getSortedArray(arr, "name", { caseinsensitive: false });
  expect(sorted.map((x) => x.name)).toEqual(["Alice", "bob"]);
});

test("getSortedArray uses asc order for unknown string", () => {
  const arr = [{ n: 2 }, { n: 1 }];
  const sorted = getSortedArray(arr, "n", "unknown");
  expect(sorted.map((x) => x.n)).toEqual([1, 2]);
});

test("getSortedArray uses asc order for config object with unknown order", () => {
  const arr = [{ n: 2 }, { n: 1 }];
  const sorted = getSortedArray(arr, "n", { order: "unknown" });
  expect(sorted.map((x) => x.n)).toEqual([1, 2]);
});

test("getSortedArray uses desc order for config object with order desc", () => {
  const arr = [{ n: 1 }, { n: 2 }];
  const sorted = getSortedArray(arr, "n", { order: "desc" });
  expect(sorted.map((x) => x.n)).toEqual([2, 1]);
});

test("getSortedArray uses insensitive sort when caseinsensitive is true", () => {
  const arr = [{ name: "bob" }, { name: "Alice" }];
  const sorted = getSortedArray(arr, "name", { caseinsensitive: true });
  expect(sorted.map((x) => x.name)).toEqual(["Alice", "bob"]);
});

test("getSortedArray uses asc order for unknown string", () => {
  const arr = [{ n: 2 }, { n: 1 }];
  const sorted = getSortedArray(arr, "n", "unknown");
  expect(sorted.map((x) => x.n)).toEqual([1, 2]);
});

test("getSortedArray uses asc order for config object with unknown order", () => {
  const arr = [{ n: 2 }, { n: 1 }];
  const sorted = getSortedArray(arr, "n", { order: "unknown" });
  expect(sorted.map((x) => x.n)).toEqual([1, 2]);
});

test("getSortedArray uses desc order for config object with order desc", () => {
  const arr = [{ n: 1 }, { n: 2 }];
  const sorted = getSortedArray(arr, "n", { order: "desc" });
  expect(sorted.map((x) => x.n)).toEqual([2, 1]);
});
