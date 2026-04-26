# KAKUZE Ver2 — プロジェクト指針

このファイルは Claude Code / GitHub Copilot がこのプロジェクトで作業する際に **必ず守るべき不変ルール** を定義する。グローバル CLAUDE.md（`~/.claude/CLAUDE.md`）と矛盾する場合はグローバル側が優先。本ファイルはこのプロジェクト固有の上乗せ。

## 1. プロジェクト概要

- **プロジェクト名**: KAKUZE Ver2（フォルダ名: `kakuze-v2`）
- **位置づけ**: Ver1（`../クロッキーアプリ開発/`）の抜本リニューアル
- **メイン目的**: お絵描き補助ツール（クロッキー・ポモドーロ・実績記録）。記事はAdSense審査クリアと流入のための副次的な役割
- **最終ゴール**: AdSense審査通過 + ツールとしての実用性 + 多様な収益化への対応

## 2. 不変ルール（絶対に変更しない）

### 2.1 XP式（Ver1から継承、Copilotにも明示すること）

- クロッキー: **2 XP / 秒**
- ポモドーロ: **1 XP / 秒**

### 2.2 レベル式（Ver1から継承）

- 次レベルに必要な累計XP: `380 × level^1.1`
- 例: Lv1→Lv2 で 380 XP、Lv2→Lv3 で 380×2^1.1 ≈ 813 XP

これらは `src/app/xp.ts` の冒頭コメントにも二重で明記し、ユニットテストで数値固定検証する。Copilotが「最適化」のために変更しないよう注意。

### 2.3 デプロイ方針

- **Vercelのみ**にデプロイする
- **Netlifyへのデプロイは絶対禁止**（コスト節約のため、ユーザーから明示指示があるまで触らない）
- 本番URL: `https://kakuze-v2.vercel.app`（暫定。独自ドメイン取得時に差し替え）

### 2.4 Ver1への影響

- **Ver1（`../クロッキーアプリ開発/`）は一切変更しない**
- コードのコピー元として参照のみ可
- Ver1の既存デプロイ（`https://kakuze-croquis.vercel.app/`）も変更しない

## 3. 技術スタック

- **Astro 5.x** + Content Collections（記事はMDX）
- **React 19** （アプリ部分のIslandsのみ）
- **TypeScript strict**
- **CSS Custom Properties**（Tailwindは使わない、DESIGN.mdの値を直接実装）
- **MDX** for blog content
- **@astrojs/sitemap** for SEO

## 4. 開発ワークフロー

1. 仕様変更前に **SPEC.md を必ず確認**し、変更があれば SPEC.md を **同じコミット**で更新
2. デザインの値（色・タイポ・余白等）変更時は **DESIGN.md の YAML フロントマターと CSS 変数の両方を同じコミットで更新**
3. 機能追加時は TEST_PLAN.md にテスト項目も追記
4. 実装前に Claude Design でモック → 実装の順を推奨（Sprint 1以降）
5. **Copilot 委譲時のルール**:
   - 各 issue に「変更してよい範囲」「不変ルール」「テスト要件」を必ず書く
   - XP/レベル式は変更禁止と明示
   - `/copilot-review` で一次レビュー、最終マージは Claude Code

## 5. ファイル構成

```
kakuze-v2/
├─ CLAUDE.md            # このファイル
├─ SPEC.md              # 機能仕様書
├─ DESIGN.md            # デザイントークン
├─ TEST_PLAN.md         # テスト項目
├─ astro.config.mjs
├─ tsconfig.json
├─ package.json
├─ src/
│  ├─ pages/            # ルーティング
│  ├─ layouts/          # BaseLayout 等
│  ├─ components/       # Header, Footer, Adsense, AuthorCard
│  ├─ app/              # React Island（Timer, XP計算, Storage）
│  ├─ content/          # blog collection
│  └─ styles/           # global.css（DESIGN.md の値を実装）
└─ public/              # robots.txt, favicon, 静的画像
```

## 6. AdSense審査対応の判断基準

実装するときは常に以下を意識する:

- 各 `/blog/*` が独立HTMLでクローラーが100%テキスト認識できるか
- 全ページに構造化データ（Article+Person+Breadcrumb）があるか
- 著者カードが各記事末に表示されるか
- パンくず・関連記事3本が全記事にあるか
- アプリ画面（`/app/*`）にAdSenseは貼らない
- `noindex` の使用は慎重に（記事ページには絶対付けない）

## 7. ローカル開発

```bash
cd kakuze-v2
npm install         # 初回
npm run dev         # 開発サーバー
npm run build       # 本番ビルド
npm run preview     # ビルド結果プレビュー
npm run type-check  # 型チェック
```

## 8. コミット時のチェックリスト

- [ ] SPEC.md / DESIGN.md / TEST_PLAN.md は変更内容と整合しているか
- [ ] XP/レベル式に手を入れていないか
- [ ] AdSenseポリシー違反になる配置になっていないか
- [ ] `npm run build` が通るか
- [ ] `npm run type-check` が通るか

## 9. 関連ドキュメント

- 計画書: `~/.claude/plans/kakuze-adsense-adsense-agile-ripple.md`
- グローバルCLAUDE.md: `~/.claude/CLAUDE.md`
- Ver1作業ログ: `★Claude用ドキュメント保管庫/作業ログ/[2026-04-02] KAKUZE AdSenseコンテンツ拡充.md`
