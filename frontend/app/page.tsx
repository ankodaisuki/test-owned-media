export const dynamic = "force-dynamic";

type Item = {
  id: number;
  name: string;
  description: string;
};

type ItemsResponse = { items: Item[] };

async function getItems(): Promise<Item[]> {
  const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:8000";
  const response = await fetch(`${apiBaseUrl}/api/items`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`APIからデータを取得できませんでした (${response.status})`);
  }

  const data: ItemsResponse = await response.json();
  return data.items;
}

export default async function HomePage() {
  const items = await getItems();

  return (
    <main>
      <h1>FastAPIのデータ</h1>
      <p>FastAPIが返したJSONをNext.jsで表示しています。</p>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "1rem" }}>
            <strong>{item.name}</strong>
            <div>{item.description}</div>
          </li>
        ))}
      </ul>
      <p>API: <a href="http://localhost:8000/docs">FastAPIのドキュメント</a></p>
    </main>
  );
}
