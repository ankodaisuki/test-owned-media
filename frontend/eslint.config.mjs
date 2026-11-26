// ESLint 設定（flat config 形式）
// Next.js 15 の推奨ルールは旧形式（eslintrc）で提供されているため、
// FlatCompat で flat config に変換して読み込む。
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  // 自動生成ファイル・ビルド成果物は lint の対象外にする
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
