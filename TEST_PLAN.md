# KAKUZE Ver2 テスト計画

## Sprint 1 検証ログ（2026-04-26）

Editorial Light デザイン適用の検証結果。Lighthouse はユーザー側の Chrome DevTools で実機計測する。

### 自動チェック（実施済）
- [x] `npm run type-check` — 0 errors / 0 warnings / 0 hints
- [x] `npm run build` — 1 page built in 2.04s, クリーン成功
- [x] ビルド成果物サイズ: `index.html` 20.4KB / `index.*.css` 23.5KB / `client.*.js` 194KB

### 手計算コントラスト（Step 6 で AA 修正済）
- [x] `--color-ink` × `--color-paper` ≈ 14.4 : 1 (AAA)
- [x] `--color-ink-muted` × `--color-paper` ≈ 6.9 : 1 (AAA)
- [x] `--color-ink-faint` × `--color-paper` ≈ 4.7 : 1 (AA) — Sprint 1 中に oklch 58%→48% に修正
- [x] `--color-accent` × `--color-paper` ≈ 7.1 : 1 (AAA)
- [x] `--color-focus` × `--color-paper` ≈ 4.5 : 1 (AA)

### Lighthouse 計測（ユーザー実施・モバイル / `/`）
- [ ] Performance ≥ 90 — 計測値: ___
- [ ] Accessibility ≥ 90 — 計測値: ___
- [ ] Best Practices ≥ 90 — 計測値: ___
- [ ] SEO ≥ 90 — 計測値: ___
- [ ] LCP < 2.5s / INP < 200ms / CLS < 0.1 — 計測値: ___

### 目視チェック（ユーザー実施）
- [ ] ヒーローのセリフ見出しが Editorial Light らしい品格
- [ ] アプリ CTA ボタンの hover/focus/active 全状態が DESIGN.md §9 通り
- [ ] モバイル幅（375px）でレイアウト崩れがない
- [ ] フォーカスリングが見やすい（Tab キーで全 interactive 要素を巡回）
- [ ] 装飾アニメが入っていない（モーションは状態の説明のみ）
- [ ] Header の sticky / backdrop-filter の見え方が自然
- [ ] フッタの sns ボタンが 44×44 のタッチ領域で押せる

---

## 0. 方針

- 機能追加時は本ファイルにテスト項目を必ず追記する
- TDD で進める: 実装前にテスト → 実装 → リファクタ
- カバレッジ目標 80%（特に `src/app/xp.ts` などロジック層は 100%）

## 1. テストツール

| 対象 | ツール | Sprint |
|------|--------|--------|
| ユニットテスト（ロジック） | Vitest | 3 |
| コンポーネント | Vitest + @testing-library/react | 3 |
| E2E | Playwright | 6 |
| アクセシビリティ | axe-core (Playwright統合) | 6 |
| Lighthouse | `@lhci/cli` (CI) | 6 |
| 構造化データ | Google Rich Results Test (手動 + URL バッチ) | 6 |

## 2. ユニットテスト

### 2.1 XP / レベル計算（`src/app/xp.ts`） — Sprint 3

**不変ルールのため数値固定で検証**

- [ ] `xpFromSeconds('croquis', 60)` === 120
- [ ] `xpFromSeconds('pomodoro', 60)` === 60
- [ ] `xpFromSeconds('croquis', 0)` === 0
- [ ] `xpToNextLevel(1)` === 380
- [ ] `xpToNextLevel(2)` === floor(380 * 2^1.1) === 813
- [ ] `xpToNextLevel(1000)` === floor(380 * 1000^1.1) （上限値、回帰テスト）
- [ ] `levelFromTotalXp(0)` === { level: 1, progress: 0 }
- [ ] `levelFromTotalXp(380)` === { level: 2, progress: 0 }
- [ ] レベル1000で頭打ちすることを確認

### 2.2 バッジ判定（`src/app/badges/checker.ts`） — Sprint 3

- [ ] streak 系: 連続日数3でブロンズ獲得
- [ ] croquis 系: 累計枚数10枚でブロンズ獲得
- [ ] focus 系: 1日12時間以上でゴールド獲得
- [ ] revival 系: 30日ブランク後再開でゴールド
- [ ] 全 117 個のバッジに対応するサンプル入力でスナップショットテスト

### 2.3 目標サイクル（`src/app/goals.ts`） — Sprint 3

- [ ] デイリー期間境界（00:00 跨ぎ）でリセット
- [ ] 連続クリアの累計が正しい
- [ ] 初回サイクル調整が正しく適用される

### 2.4 ストレージ層（`src/app/storage.ts`） — Sprint 3 / 4

- [ ] localStorage 容量超過時に `safeLocalStorageSet` がエラーを返す
- [ ] エクスポート JSON が Ver1 のスキーマと一致
- [ ] インポート（マージ・上書き）が正しく動作
- [ ] バリデーション（`validateCroquisSet` 等）の異常系

## 3. コンポーネントテスト — Sprint 3

- [ ] `Timer.tsx` がカウントダウン → プレイ → 完了の状態遷移を行う
- [ ] 一時停止／再開が正しく動作
- [ ] スキップ・リセット・回転・反転の各操作
- [ ] 画像表示モード切替（固定 / 非表示 / タイマーのみ）

## 4. E2E テスト（Playwright） — Sprint 6

### 4.1 アプリのゴールデンパス

- [ ] トップ → タイマーへ遷移
- [ ] セット作成 → 開始 → 1セッション完了 → XP 加算 → 履歴記録
- [ ] レベルアップ通知が表示される
- [ ] バッジ獲得通知が表示される

### 4.2 記事ページ

- [ ] `/blog` 一覧が記事を表示
- [ ] 個別記事ページ（`/blog/[slug]`）が表示される
- [ ] パンくず・関連記事3本・著者カードが表示
- [ ] 構造化データ JSON-LD が `<head>` に存在

### 4.3 ナビゲーション

- [ ] ヘッダの全リンクが機能
- [ ] フッタの全リンクが機能
- [ ] スキップリンクがフォーカス時に表示
- [ ] 現在ページが `aria-current="page"` で示される

### 4.4 データ管理

- [ ] エクスポート → ファイルダウンロード
- [ ] インポート → 既存データに反映
- [ ] localStorage 完全削除

## 5. アクセシビリティ — Sprint 6

- [ ] 全主要ページで axe-core 違反 0 件
- [ ] キーボードのみで全機能操作可能
- [ ] スクリーンリーダーで主要見出しが読める
- [ ] `prefers-reduced-motion: reduce` でアニメーション停止
- [ ] 色コントラスト WCAG AA 以上（DESIGN.md §2.4 と一致）

## 6. パフォーマンス（Lighthouse） — Sprint 6

各主要ページで以下のスコア:

| ページ | Performance | Accessibility | Best Practices | SEO |
|--------|------------|---------------|----------------|-----|
| `/` | ≥ 95 | ≥ 95 | ≥ 95 | ≥ 95 |
| `/blog/*` | ≥ 95 | ≥ 95 | ≥ 95 | ≥ 95 |
| `/app` | ≥ 85 | ≥ 95 | ≥ 95 | ≥ 95 |

Core Web Vitals:
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1

## 7. 構造化データ — Sprint 6

- [ ] 全 `/blog/*` で `Article` + `BreadcrumbList` + `Person` JSON-LD が valid
- [ ] `/app` で `SoftwareApplication` JSON-LD が valid
- [ ] `/` で `WebSite` JSON-LD が valid
- [ ] Google Rich Results Test で全ページ通過

## 8. AdSense 申請前チェックリスト — Sprint 7

1. [ ] 記事数 12 本以上、各 3,000 字以上
2. [ ] プライバシーポリシー、利用規約、運営者、お問い合わせが全て稼働
3. [ ] お問い合わせフォーム実機テスト（受信確認）
4. [ ] 全記事に構造化データ（Article + Person + Breadcrumb）
5. [ ] モバイル実機でレイアウト崩れ無し
6. [ ] PageSpeed Insights モバイル ≥ 90
7. [ ] 重複コンテンツ無し（Ver1 既存記事との差分が十分）
8. [ ] 各記事に著者カード表示
9. [ ] X / Pinterest からの流入実績
10. [ ] sitemap.xml を Search Console に登録済み
11. [ ] 過去 30 日で PV 20+/日 を確認
12. [ ] 独自ドメイン適用（推奨）
13. [ ] AdSense ポリシー全項目セルフチェック

## 9. 手動 QA

- [ ] Chrome / Firefox / Safari / Edge で表示崩れ無し
- [ ] iPhone / Android 実機でアプリ動作
- [ ] OS ダークモードで意図通り表示
- [ ] 印刷プレビューで記事が読める

## 10. 回帰テスト基準

- 機能追加で既存テストが失敗しないこと
- XP/レベル/バッジの数値が変わっていないこと（不変ルール）
- localStorage キー名が変わっていないこと
