# KAKUZE Ver2 機能仕様書

このファイルは「いま何が実装されているか」を正確に記録する。機能を追加・変更・削除したら**同じコミットで必ず本ファイルを更新する**。

> 本仕様は Ver1（`../クロッキーアプリ開発/SPEC.md`）の完全移植を前提とする。Ver1の細部仕様（バッジ条件・XP計算など）は Ver1 SPEC.md を一次ソースとし、本ファイルは Ver2 でのアーキテクチャ・配置・実装状況を記述する。

## 0. 実装ステータス（Sprintごと）

| 機能 | Sprint | 状況 |
|------|--------|------|
| Astro 雛形・基本レイアウト | 0 | ✅ 完了 |
| Editorial Light デザイン適用（DESIGN.md 確定 + トップページ） | 1 | ✅ 完了（2026-04-26） |
| 静的ページ群（法令・運営者・guide・about・features・contact） | 2 | ✅ 完了（2026-04-27） |
| Content Collections（記事 MDX） | 2 | ✅ 完了（2026-04-27、ダミー記事3本） |
| クロッキータイマーコア | 3 | ⏳ 未着手 |
| ポモドーロ | 3 | ⏳ 未着手 |
| XP / レベル / バッジ | 3 | ⏳ 未着手 |
| 画像管理（IndexedDB / クラウドURL / Drive） | 4 | ⏳ 未着手 |
| 記事 12〜15 本（既存リライト + 新規） | 5 | ⏳ 未着手 |
| Lighthouse / a11y 最終チェック | 6 | ⏳ 未着手 |
| AdSense 申請 + 収益化導線 | 7 | ⏳ 未着手 |

## 1. サイト構造

### 1.1 ページ一覧

| URL | 種別 | 配置 | AdSense | 実装状況 |
|-----|------|------|---------|---------|
| `/` | 静的 | `src/pages/index.astro` | 任意 | ✅ Editorial Light 適用（hero / stats / features / editorial / articles / author） |
| `/app` | アプリ（Island） | `src/pages/app/index.astro` | × | ⏳ |
| `/app/pomodoro` | アプリ（Island） | `src/pages/app/pomodoro.astro` | × | ⏳ |
| `/app/gallery` | アプリ（Island） | `src/pages/app/gallery.astro` | × | ⏳ |
| `/blog` | 一覧 | `src/pages/blog/index.astro` | ○ | ✅ Breadcrumb + CollectionPage JSON-LD |
| `/blog/[slug]` | 動的 | `src/pages/blog/[slug].astro` | ○ | ✅ AuthorCard + RelatedArticles + Article/BreadcrumbList JSON-LD |
| `/guide` | 静的 | `src/pages/guide.astro` | ○ | ✅ Breadcrumb + WebPage JSON-LD |
| `/features` | 静的 | `src/pages/features.astro` | ○ | ✅ Breadcrumb + 6機能カード |
| `/about` | 静的 | `src/pages/about.astro` | ○ | ✅ AuthorCard + Article/BreadcrumbList JSON-LD（2000字以上） |
| `/about-us` | 静的 | `src/pages/about-us.astro` | ○ | ✅ Person JSON-LD + TODOプレースホルダー |
| `/contact` | 静的+フォーム | `src/pages/contact.astro` | × | ✅ Formspreeプレースホルダー付きフォーム |
| `/privacy-policy` | 静的 | `src/pages/privacy-policy.astro` | × | ✅ WebPage JSON-LD |
| `/terms` | 静的 | `src/pages/terms.astro` | × | ✅ WebPage JSON-LD |
| `/sitemap-index.xml` | 自動生成 | `@astrojs/sitemap` | — | ✅ |
| `/robots.txt` | 静的 | `public/robots.txt` | — | ✅ |

### 1.2 共通レイアウト

- `src/layouts/BaseLayout.astro` で全ページ統一
  - ✅ ヘッダ（`Header.astro`）
  - ✅ フッタ（`Footer.astro`）
  - ✅ SEOメタ（title / description / canonical / OGP / Twitter Card）
  - ✅ JSON-LD注入スロット
  - ✅ noindex プロパティ
  - ✅ スキップリンク（a11y）
  - ✅ パンくず（`Breadcrumb.astro` — Sprint 2 完了）

## 2. クロッキータイマー（Sprint 3）

Ver1 仕様完全移植。詳細は Ver1 `SPEC.md` 第 2 章。

### 2.1 セット構成

| 設定項目 | 範囲 | 備考 |
|---|---|---|
| 時間 | 0:00:00〜99999999:59:59 | h:m:s |
| 枚数 | 1〜99999999 | |
| お手本観察モード | ON/OFF | 枚数カウント外 |
| 固定画像モード | ON/OFF | 同一画像表示 |
| 画像非表示モード | ON/OFF | タイマーのみ |
| タイマーモード | ON/OFF | 画像なし純タイマー |

### 2.2 タイマー動作

開始 → 3秒カウントダウン → プレイ → 自動次画像 → 全完了で復帰。

### 2.3 操作

一時停止/再開、スキップ、リセット、回転（±90°）、左右反転、画像名保存、終了。

### 2.4 画面構成（Ver2）

`src/app/Timer.tsx`（React Island）として実装。`src/pages/app/index.astro` から `client:load` で起動。

## 3. ポモドーロタイマー（Sprint 3）

Ver1 仕様完全移植。`src/app/Pomodoro.tsx`。

| 項目 | 仕様 |
|---|---|
| 作業時間 / 休憩時間 / サイクル数 | 任意 |
| 最終休憩スキップ | ON/OFF |
| XP | 作業時間のみ 1 XP/秒 |

## 4. 画像管理（Sprint 4）

Ver1 仕様完全移植。

| ソース | 実装 |
|---|---|
| ローカルフォルダ | File System Access API + IndexedDB（`CroquisTimerDB`/`folderHandles`） |
| クラウドURL一覧 | localStorage（`croquis_cloud_urls`） |
| Google Drive | Vercel Functions（`/api/get-drive-images`） |

**注意**: Sprint 4 ではクラウドURLとローカルフォルダを優先実装し、Drive連携は Vercel Functions セットアップ完了後（後送り可）。

## 5. ゲーミフィケーション（Sprint 3 / 5）

### 5.1 XP（不変）

| モード | 計算式 |
|---|---|
| クロッキー | `seconds * 2` |
| ポモドーロ | `seconds * 1`（作業時間のみ） |

### 5.2 レベル（不変）

- 必要XP: `floor(380 * pow(level, 1.1))`
- 上限: Lv1000

### 5.3 累計枚数ボーナス（BONUS_TIERS）

Ver1 と同一: tier100 / tier500 / tier1000 / tier5000 / tier10000。手動受取方式。

### 5.4 称号（LEVEL_TITLES / STREAK_TITLES）

Ver1 と同一データ。装備中の称号は localStorage `croquis_equipped_title`。

### 5.5 バッジ（BADGES — 117個）

Ver1 と同一データ。カテゴリ: bronze / streak / time / croquis / goal / timeOfDay / focus / revival / pattern / calendar / special。

### 5.6 実装配置

- `src/app/xp.ts` — XP/レベル計算（**冒頭コメントに不変ルールを明記**）
- `src/app/badges/data.ts` — BADGES / LEVEL_TITLES / STREAK_TITLES / BONUS_TIERS
- `src/app/badges/checker.ts` — 達成判定
- ユニットテストで数値固定検証（Vitest 導入予定、Sprint 3）

## 6. 目標システム（Sprint 3）

Ver1 と同一仕様。デイリー / ウィークリー / マンスリー / イヤリーの 4 期間、枚数 / 時間 の 2 タイプ。サイクル制、連続クリア追跡、初回サイクル調整。

## 7. 統計・履歴（Sprint 3）

セッション履歴・累計枚数・累計秒数・ストリーク・時間帯別集計（6帯）。Ver1と同一。

## 8. データ永続化（Sprint 3）

### 8.1 localStorage キー

Ver1 SPEC.md 第8章のキー一覧と完全一致させる（`croquis_` / `croquis-` プレフィックス）。Ver1 ユーザーのデータ移行を見据える。

### 8.2 IndexedDB

- DB: `CroquisTimerDB`
- Store: `folderHandles`（フォルダハンドル永続化）

### 8.3 マイグレーション機能（Sprint 4 で必須実装）

Ver1 → Ver2 のローカルストレージ移行は同一オリジンであれば不要だが、**異なるドメイン**にデプロイする場合に備えてエクスポート/インポート機能を必ず実装する:

- 完全バックアップ JSON 形式（Ver1 と同一スキーマ）
- セットリストのみ / 実績のみ / 完全 の 3 種

## 9. セッション復帰（Sprint 3）

ページリロード/ブラウザクローズで `croquis_in_progress` / `pomodoro_in_progress` に保存。次回起動で復元、10秒以上は枚数1カウント、`interrupted: true` で履歴保存。

## 10. 音声システム（Sprint 3）

Web Audio API による合成音（音声ファイルなし）。シングルトン AudioContext を `window.__croquisAudio` で管理。カウントダウン警告音（30/10/3/2/1秒）、完了音、フェーズ遷移音。音量・ミュートは localStorage。

## 11. 広告システム（Sprint 7）

Ver1 と異なり Ver2 では **AdSense は記事ページと about/about-us のみに配置**（アプリ画面には貼らない）。

- 実装: `src/components/Adsense.astro`（コンポーネント）
- 環境変数 `PUBLIC_ADSENSE_CLIENT` でクライアント ID を切替
- `<Adsense slot="..." />` でスロット指定
- 環境別表示:
  - dev / preview: ダミー枠（プレースホルダー）
  - production: 本番 AdSense ユニット

## 12. 収益化（Sprint 5 / 7）

### 12.1 アフィリエイト

`src/components/AffiliateLink.astro` でラップ。`rel="sponsored nofollow"` を必ず付与。Amazon / 楽天。

### 12.2 投げ銭

フッタ・about-us に Ko-fi / BOOST / BOOTH のリンク。

### 12.3 プレミアム機能（将来）

- Stripe Checkout を Vercel Functions 経由
- 機能: 広告非表示、クラウド画像無制限保存
- 実装は Sprint 7 以降

## 13. SEO・構造化データ

### 13.1 全記事必須

- `Article` JSON-LD
- `BreadcrumbList` JSON-LD
- `Person` JSON-LD（著者: へんしゅうちょ）
- 著者カード（記事末）
- 関連記事 3 本（記事末）
- パンくず（ヘッダ下）

### 13.2 アプリページ

- `SoftwareApplication` JSON-LD

### 13.3 sitemap / robots

- ✅ `public/robots.txt`（AdSense クローラー明示許可）
- ✅ `@astrojs/sitemap` で自動生成

## 14. アクセシビリティ

- 全ページ `lang="ja"`、スキップリンク
- フォーカスリング `:focus-visible` 必須
- セマンティック HTML（`<main>`, `<nav>`, `<header>`, `<footer>`）
- 色コントラスト WCAG AA 以上（DESIGN.md §2.4 で計測）
- `prefers-reduced-motion: reduce` でアニメーション停止

## 15. ビルド・デプロイ

| コマンド | 用途 |
|---|---|
| `npm run dev` | 開発サーバー |
| `npm run build` | 本番ビルド（`dist/`） |
| `npm run preview` | ビルド結果プレビュー |
| `npm run type-check` | 型チェック（`astro check`） |

デプロイ先: **Vercel のみ**（Netlify は明示指示があるまで禁止）。

## 16. 環境変数

| 変数名 | 用途 | 設置 |
|---|---|---|
| `PUBLIC_ADSENSE_CLIENT` | AdSenseクライアントID | Vercel管理画面 |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Drive APIサービスアカウント | Vercel管理画面（Sprint 4 以降） |

`PUBLIC_` プレフィックスはクライアントに露出する変数のみ（Astro 仕様）。
