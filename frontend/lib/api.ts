export type Item = {
  id: number;
  name: string;
  description: string;
};

type ItemsResponse = { items: Item[] };

export async function getItems(): Promise<Item[]> {
  const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:8000";
  const response = await fetch(`${apiBaseUrl}/api/items`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`APIからデータを取得できませんでした (${response.status})`);
  }

  const data: ItemsResponse = await response.json();
  return data.items;
}
