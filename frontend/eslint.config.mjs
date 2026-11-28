// ESLint 設定（flat config 形式）
// Next.js 16 の推奨ルールは flat config で提供されるため、そのまま読み込む。
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // 自動生成ファイル・ビルド成果物は lint の対象外にする
  globalIgnores([".next/**", "next-env.d.ts"]),
  ...nextVitals,
  ...nextTs,
]);

export default eslintConfig;
