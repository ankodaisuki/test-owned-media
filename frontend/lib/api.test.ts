import { afterEach, describe, expect, it, vi } from "vitest";
import { getItems } from "./api";

// 各テストのあとで、差し替えた fetch と環境変数を元に戻す
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("getItems", () => {
  it("API が返した items を返す", async () => {
    // 準備：API の URL と、fetch の偽物を用意する
    vi.stubEnv("API_BASE_URL", "http://api.test");
    const items = [{ id: 1, name: "りんご", description: "赤い果物" }];
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ items }), { status: 200 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    // 実行と確認：items がそのまま返ってくるか
    await expect(getItems()).resolves.toEqual(items);

    // 確認：正しい URL とオプションで fetch を呼んだか
    expect(fetchMock).toHaveBeenCalledWith("http://api.test/api/items", {
      cache: "no-store",
    });
  });

  it("API がエラーを返したら例外を投げる", async () => {
    // 準備：API の URL と、fetch の偽物を用意する
    vi.stubEnv("API_BASE_URL", "http://api.test");
    const items = [{ id: 1, name: "りんご", description: "赤い果物" }];
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ items }), { status: 500 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    // 実行と確認：例外が投げられるか
    await expect(getItems()).rejects.toThrow(
      "APIからデータを取得できませんでした (500)",
    );

    // 確認：正しい URL とオプションで fetch を呼んだか
    expect(fetchMock).toHaveBeenCalledWith("http://api.test/api/items", {
      cache: "no-store",
    });
  });
});
