import { getItems } from "@/lib/api";

export const dynamic = "force-dynamic";

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
      <p>
        API: <a href="http://localhost:8000/docs">FastAPIのドキュメント</a>
      </p>
    </main>
  );
}
