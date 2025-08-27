import { describe, expect, it } from "vitest";

describe("Vitest Setup", () => {
  it("should work correctly", () => {
    expect(true).toBe(true);
  });

  it("should handle basic math", () => {
    expect(2 + 2).toBe(4);
  });

  it("should handle string operations", () => {
    expect("hello" + " world").toBe("hello world");
  });
});
