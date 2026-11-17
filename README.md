# オウンドメディア連携サンプル

> **テスト用プロジェクトです。** Next.js から FastAPI にアクセスし、FastAPI が返す静的な JSON データを画面に表示する流れを確認するためのサンプルです。実際のサービスや本番環境での利用を目的としたものではありません。

## 必要なもの

- Git
- Docker Desktop（Docker Compose が使える状態）

Node.js や Python をローカルマシンに直接インストールしなくても、Docker 上で起動できます。

## 起動方法

### 1. リポジトリをクローン

```bash
git clone <GitHubリポジトリのURL>
cd <クローンしたフォルダ名>
```

`<GitHubリポジトリのURL>` は GitHub の **Code** ボタンからコピーします。たとえば、リポジトリ名が `test-owned-media` の場合は次のようになります。

```bash
git clone https://github.com/ankodaisuki/test-owned-media.git
cd test-owned-media
```

### 2. Docker Compose で起動

リポジトリのルート（`compose.yaml` がある場所）で実行します。

```bash
docker compose up --build
```

初回はコンテナイメージの取得と、必要なパッケージのインストールが行われます。起動ログが表示されたまま、ターミナルを開いておいてください。

別のターミナルを開き、同じリポジトリのルートでコンテナの状態を確認します。

```bash
docker compose ps
```

出力の `SERVICE` 列で `web` と `api` の行を確認し、それぞれの `STATUS` 列が `Up` と表示されていれば起動しています。どちらかのサービスが表示されない、または `STATUS` が `Exited` など `Up` 以外の場合は、起動中のターミナルに出ているログを確認してください。

### 3. ブラウザで確認

- Next.js画面: <http://localhost:3000>
- FastAPIのAPIドキュメント: <http://localhost:8000/docs>
- FastAPIのヘルスチェック: <http://localhost:8000/health>

Next.js画面に「りんご」「みかん」「ぶどう」「バナナ」「メロン」が表示されれば、Next.js から FastAPI の JSON を取得できています。

### 停止方法

起動中のターミナルで `Ctrl+C` を押します。コンテナも停止して削除する場合は、リポジトリのルートで次を実行します。

```bash
docker compose down
```

ソースコードを変更した後、イメージを作り直して起動し直す場合は次を実行してください。

```bash
docker compose up --build
```

## ディレクトリ構成

```text
.
├── compose.yaml             # Next.js と FastAPI をまとめて起動する設定
├── backend/
│   ├── Dockerfile           # FastAPI 用コンテナイメージの作成手順
│   ├── requirements.txt     # Python の依存パッケージ
│   ├── main.py              # FastAPI アプリと静的 JSON を返す API
│   └── .dockerignore        # Docker イメージに含めない Python 関連ファイル
└── frontend/
    ├── Dockerfile           # Next.js 用コンテナイメージの作成手順
    ├── package.json         # Next.js、React、TypeScript などの依存パッケージとコマンド
    ├── tsconfig.json        # TypeScript の設定
    ├── next.config.ts       # Next.js の設定
    ├── .dockerignore        # Docker イメージに含めないファイル
    └── app/
        ├── layout.tsx       # ページ全体の共通レイアウト
        └── page.tsx         # FastAPI から JSON を取得して表示するページ
```

## 接続の流れ

1. `compose.yaml` が `api`（FastAPI）と `web`（Next.js）のコンテナを起動します。
2. Next.js は `API_BASE_URL=http://api:8000` を使って、FastAPI の `/api/items` にアクセスします。
3. FastAPI が静的な JSON を返し、Next.js が一覧として表示します。

`api` は Docker Compose 内で FastAPI コンテナを指す名前です。ホストマシンのブラウザからは `localhost` を使って各画面やAPIを確認します。

## Vercel について

このリポジトリはローカル確認に Docker Compose を使います。Vercel へデプロイする場合は `frontend` と `backend` をそれぞれ別の Vercel プロジェクトとして設定します。Docker Compose 自体は Vercel では起動しません。
