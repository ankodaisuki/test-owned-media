import { describe, it, expect } from "vitest";
import { truncate } from "./text";

describe("truncate", () => {
  it("上限より短い文字列はそのまま返す", () => {
    expect(truncate("こんにちは", 10)).toBe("こんにちは");
  });

  it("上限ちょうどの文字列はそのまま返す", () => {
    expect(truncate("あいうえお", 5)).toBe("あいうえお");
  });

  it("上限を超えたら、上限の文字数で切って … を付ける", () => {
    expect(truncate("あいうえおかきく", 5)).toBe("あいうえお…");
  });
});
