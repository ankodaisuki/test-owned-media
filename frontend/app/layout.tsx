import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FastAPI連携サンプル",
  description: "FastAPIのJSONをNext.jsで表示するサンプル",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body
        style={{
          fontFamily: "sans-serif",
          margin: "2rem auto",
          maxWidth: 720,
          padding: "0 1rem",
        }}
      >
        {children}
      </body>
    </html>
  );
}
