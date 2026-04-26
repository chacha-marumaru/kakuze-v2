---
# ==============================================================================
# Google DESIGN.md 仕様 (alpha) 互換のフロントマター
# ------------------------------------------------------------------------------
# 値の正本は src/styles/global.css の :root の CSS 変数。
# このフロントマターは validator 用の機械可読版。
# 値を変更したら **同じコミットで両方** 更新すること（CLAUDE.md §4 不変ルール）。
# ==============================================================================
version: alpha
name: "KAKUZE Ver2"
description: "Editorial Light — 紙面型・落ち着いた品格・装飾アニメ抑制。クロッキー練習を支える静かな道具を意図する。"
direction: "editorial-light"
mode: "light-only"

# 原色 (プリミティブ) — Editorial Light 確定値
colors:
  # Paper / Surface (warm off-white tones)
  paper:        "oklch(98% 0.006 85)"
  paper-deep:   "oklch(95.5% 0.010 85)"
  surface:      "#ffffff"

  # Ink (near-black with slight violet undertone, avoids cold pure black)
  ink:          "oklch(18% 0.014 285)"
  ink-muted:    "oklch(40% 0.014 285)"
  ink-faint:    "oklch(48% 0.012 285)"  # WCAG AA: ~4.7:1 on paper

  # Hairlines and rules
  border:       "oklch(88% 0.008 85)"
  rule:         "oklch(20% 0.014 285)"

  # Accent — deep ink indigo
  accent:       "oklch(38% 0.13 270)"
  accent-soft:  "oklch(96% 0.02 270)"
  focus:        "oklch(55% 0.18 270)"

  # Status (muted, journal-like — never neon)
  success:      "oklch(58% 0.13 145)"
  warning:      "oklch(72% 0.14 75)"
  danger:       "oklch(54% 0.18 22)"
  info:         "oklch(58% 0.12 235)"

  # Semantic aliases
  bg:           "{colors.paper}"
  text:         "{colors.ink}"
  text-muted:   "{colors.ink-muted}"

typography:
  display:
    fontFamily: "Noto Serif JP, Source Serif Pro, Georgia, serif"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.025em
  body:
    fontFamily: "Noto Sans JP, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    fontSize: 1rem
    lineHeight: 1.7
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
  caption:
    fontFamily: "Noto Sans JP, ui-sans-serif, sans-serif"
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.04em

scale:
  xs:   "0.75rem"
  sm:   "0.8125rem"
  base: "clamp(1rem, 0.95rem + 0.22vw, 1.0625rem)"
  lg:   "clamp(1.125rem, 1.06rem + 0.32vw, 1.25rem)"
  xl:   "clamp(1.375rem, 1.24rem + 0.55vw, 1.6875rem)"
  2xl:  "clamp(1.875rem, 1.55rem + 1.4vw, 2.625rem)"
  3xl:  "clamp(2.375rem, 1.85rem + 2.2vw, 3.5rem)"
  hero: "clamp(2.75rem, 1.5rem + 5.6vw, 6.25rem)"

rounded:
  sm:   "2px"
  md:   "4px"
  lg:   "8px"
  xl:   "12px"
  pill: "9999px"

spacing:
  "1":  "0.25rem"
  "2":  "0.5rem"
  "3":  "0.75rem"
  "4":  "1rem"
  "6":  "1.5rem"
  "8":  "2rem"
  "12": "3rem"
  "16": "4rem"
  "24": "6rem"
  section:    "clamp(4rem, 3rem + 5vw, 7.5rem)"
  section-sm: "clamp(2.5rem, 2rem + 2vw, 4rem)"

layout:
  container-tight:  "42rem"
  container-base:   "64rem"
  container-wide:   "80rem"
  container-gutter: "clamp(1.25rem, 4vw, 2.5rem)"

motion:
  duration:
    fast: "150ms"
    base: "250ms"
    slow: "400ms"
  ease:
    standard:   "cubic-bezier(0.2, 0, 0, 1)"
    emphasized: "cubic-bezier(0.3, 0, 0.3, 1.3)"

elevation:
  sm: "0 1px 2px oklch(20% 0.014 285 / 0.05)"
  md: "0 4px 14px oklch(20% 0.014 285 / 0.07)"
  lg: "0 16px 40px oklch(20% 0.014 285 / 0.09)"
---

<!--
==============================================================================
 KAKUZE Ver2 DESIGN.md (Editorial Light · 確定版 · Sprint 1)
==============================================================================
 値の正本は src/styles/global.css の :root の CSS 変数。
 上記 YAML フロントマターは validator 用の機械可読版。
 値を変更する場合は両方を必ず同じコミットで更新する（CLAUDE.md §4 不変ルール）。
==============================================================================
-->

# DESIGN.md — KAKUZE Ver2

## 0. メタ情報 [必須]

| 項目 | 値 |
|------|-----|
| プロジェクト名 | KAKUZE Ver2 |
| 方向性ラベル | **Editorial Light（確定）** |
| サブタイトル | 紙面型・落ち着いた品格・装飾アニメ抑制 |
| 主な対象デバイス | レスポンシブ。アプリは PC 優先、記事はモバイル優先 |
| ライト・ダーク | **light-only**（ダークは Sprint 6 検討） |
| 参考デザインリンク | https://oo-box.net/30secdrow/index.html |
| デザインリード | 吞み気（ikuzo） |
| 最終更新 | 2026-04-26（Sprint 1 確定） |

---

## 1. デザイン原則 [必須]

> 1. **道具らしさ優先**。クロッキーで集中している間に視界の邪魔をしない静けさ。装飾アニメを入れない。
> 2. **長文記事の可読性**。記事ページは紙面の落ち着き、行間と余白で読ませる。
> 3. **モーションは状態の説明**。状態変化（hover / focus / press / open / close / load）にのみモーションを使う。
> 4. **エディトリアルな構図**。対称グリッドに頼らない。ヒーローは非対称、機能は番号で並べる、記事はチップ + 見出しで分離する。
> 5. **紙のテクスチャ**。フラットな白でなく、温かみのあるオフホワイト。端のコーナーに微かな放射グラデで「紙面」を演出する。

**アンチパターン（design-quality.md より）**: dashboard-by-numbers、テンプレ的ヒーロー、フラットなカードグリッド、単調なグレー＋アクセント1色、ガラス・グラデーションメッシュ・ネオン・3D。

---

## 2. カラートークン [必須]

### 2.1 カラースペース方針

- 基本は **oklch**（知覚的均一）。CSS 変数は oklch のまま記述する
- WCAG AA 以上を最低基準（本文 4.5:1、大見出し 3:1）。本文は AAA（7:1）も狙う
- 蛍光色は使わない。ステータス色も「ノートのマーカー的なくすんだ色」に揃える

### 2.2 プリミティブ（Editorial Light）

実値は `src/styles/global.css` を参照。サマリ:

| トークン | 値 | 用途 |
|---|---|---|
| `--color-paper` | `oklch(98% 0.006 85)` | ページ背景。温かみのあるオフホワイト |
| `--color-paper-deep` | `oklch(95.5% 0.010 85)` | 代替セクション、運営者カードの裏 |
| `--color-surface` | `#ffffff` | カードや純白が必要な領域 |
| `--color-ink` | `oklch(18% 0.014 285)` | 本文 / 見出し。純黒でなく僅かに紫がかった濃グレー |
| `--color-ink-muted` | `oklch(40% 0.014 285)` | サブテキスト |
| `--color-ink-faint` | `oklch(48% 0.012 285)` | メタ情報（WCAG AA: 4.7:1） |
| `--color-border` | `oklch(88% 0.008 85)` | 要素境界の薄いライン |
| `--color-rule` | `oklch(20% 0.014 285)` | エディトリアルな水平ルール |
| `--color-accent` | `oklch(38% 0.13 270)` | 深いインク・インディゴ。リンク hover、CTA hover、強調アクセント |
| `--color-accent-soft` | `oklch(96% 0.02 270)` | チップ背景・微弱な強調 |
| `--color-focus` | `oklch(55% 0.18 270)` | `:focus-visible` のリング |

### 2.3 セマンティック

`--color-bg` = `--color-paper`、`--color-text` = `--color-ink`、`--color-text-muted` = `--color-ink-muted`、`--color-text-subtle` = `--color-ink-faint`。

### 2.4 コントラスト検証 [必須]

WebAIM Contrast Checker および APCA 概算で評価。oklch → sRGB 変換は CSS Color Module Level 4 準拠（Chromium / Firefox の表示と一致）。

| 前景 × 背景 | 目標 | 実測 | 判定 |
|------------|------|------|------|
| `--color-ink` × `--color-paper` | ≥ 7:1 | 約 14.4 : 1 | AAA |
| `--color-ink-muted` × `--color-paper` | ≥ 4.5:1 | 約 6.9 : 1 | AAA |
| `--color-ink-faint` × `--color-paper` | ≥ 4.5:1（メタ用） | 約 4.7 : 1 | AA |
| `--color-accent` × `--color-paper` | ≥ 4.5:1 | 約 7.1 : 1 | AAA |
| `--color-paper` × `--color-ink`（CTA primary） | ≥ 4.5:1 | 約 14.4 : 1 | AAA |
| `--color-focus` × `--color-paper` | ≥ 3:1 | 約 4.5 : 1 | AA |

**判定**: 実装後に Lighthouse + axe-core で再検証する（Step 7）。著しい乖離があれば oklch L 値を 2〜4 ポイント調整する。

---

## 3. タイポグラフィ [必須]

### 3.1 フォントスタック

```css
--font-display: "Noto Serif JP", "Source Serif Pro", Georgia, serif;
--font-body:    "Noto Sans JP",  ui-sans-serif, system-ui, -apple-system, sans-serif;
--font-mono:    ui-monospace, SFMono-Regular, Consolas, monospace;
```

- ディスプレイ: **Noto Serif JP**（700 / 900）。letter-spacing -0.015〜-0.025em で引き締め
- 本文: **Noto Sans JP**（400 / 500 / 700）
- 数字（XP・時間・日付）: `font-feature-settings: "tnum" 1; font-variant-numeric: tabular-nums;`
- 字詰め: 日本語は `font-feature-settings: "palt" 1` で詰める

### 3.2 読み込み戦略

- Google Fonts セルフホスト（`@astrojs/font` または手動）+ **`preload` + `font-display: swap`**
- subset は日本語 + 英数 + 記号
- フォールバック CLS 抑制のため `size-adjust` / `ascent-override` の設定を `global.css` に追加

### 3.3 スケール（clamp ベース）

| トークン | 値 | 用途 |
|---|---|---|
| `--text-xs` | `0.75rem` | キャプション / メタ |
| `--text-sm` | `0.8125rem` | ナビ / フットリンク |
| `--text-base` | `clamp(1rem, 0.95rem + 0.22vw, 1.0625rem)` | 本文 |
| `--text-lg` | `clamp(1.125rem, 1.06rem + 0.32vw, 1.25rem)` | リード文 |
| `--text-xl` | `clamp(1.375rem, 1.24rem + 0.55vw, 1.6875rem)` | h3 |
| `--text-2xl` | `clamp(1.875rem, 1.55rem + 1.4vw, 2.625rem)` | h2 |
| `--text-3xl` | `clamp(2.375rem, 1.85rem + 2.2vw, 3.5rem)` | セクションタイトル |
| `--text-hero` | `clamp(2.75rem, 1.5rem + 5.6vw, 6.25rem)` | ヒーロー |

### 3.4 行間

| トークン | 値 | 用途 |
|---|---|---|
| `--leading-tight` | 1.15 | 大見出し |
| `--leading-snug` | 1.35 | 小見出し |
| `--leading-base` | 1.7 | 本文 |
| `--leading-loose` | 1.9 | 引用・エディトリアル段落 |

---

## 4. スペーシング [必須]

4px グリッドを基本。`--space-1` (0.25rem) 〜 `--space-24` (6rem) の刻み。セクション間は `--space-section: clamp(4rem, 3rem + 5vw, 7.5rem)`、節内は `--space-section-sm: clamp(2.5rem, 2rem + 2vw, 4rem)`。

エディトリアル文章の行幅は **約 38em**（`--container-tight: 42rem` でカバー）に保つ。

---

## 5. レイアウト [必須]

| トークン | 値 | 用途 |
|---|---|---|
| `--container-tight` | `42rem` | 記事本文・エディトリアル段落 |
| `--container-base` | `64rem` | 標準セクション |
| `--container-wide` | `80rem` | ヒーロー・スタッツ・記事一覧 |
| `--container-gutter` | `clamp(1.25rem, 4vw, 2.5rem)` | 左右パディング |

非対称グリッドの推奨例:

- ヒーロー: `1.45fr / 1fr`（コピー / オブジェクト）
- 著者カード: `1fr / 220px`（テキスト / ポートレート）
- 機能 3 列: 等間隔だが番号と縦罫線で「カード」感を抑える

---

## 6. モーション [必須]

```css
--duration-fast:  150ms;   /* hover, focus, button */
--duration-base:  250ms;   /* slide, fade, ナビアンダーライン */
--duration-slow:  400ms;   /* モーダルや大きな状態変化 */
--ease-standard:   cubic-bezier(0.2, 0, 0, 1);
--ease-emphasized: cubic-bezier(0.3, 0, 0.3, 1.3);
```

- `prefers-reduced-motion: reduce` で全アニメーション即時化（実装済み）
- 装飾アニメ・パララックスは禁止
- スクロールリビールは記事本文では使わない（読書を妨げない）

---

## 7. エレベーション [必須]

| トークン | 値 | 用途 |
|---|---|---|
| `--shadow-sm` | `0 1px 2px oklch(20% 0.014 285 / 0.05)` | ボタン安静時、薄い境界補助 |
| `--shadow-md` | `0 4px 14px oklch(20% 0.014 285 / 0.07)` | ヒーローのタイマーカード、ボタン hover |
| `--shadow-lg` | `0 16px 40px oklch(20% 0.014 285 / 0.09)` | モーダル、フローティングメニュー（Sprint 2 以降） |

純黒の影でなく ink 色（紫味）の半透明にすることで紙面に馴染む。

---

## 8. ボーダー・半径 [必須]

| トークン | 値 | 用途 |
|---|---|---|
| `--radius-sm` | `2px` | 入力欄・タグ |
| `--radius-md` | `4px` | カード・タイマーカード |
| `--radius-lg` | `8px` | モーダル・大きめのカード |
| `--radius-xl` | `12px` | 例外的な使用 |
| `--radius-pill` | `9999px` | ボタン・チップ |

- ボーダー幅は **1px 一択**（細さで紙面感を作る）
- 大きな半径は使わない。Editorial Light の品格を保つ

---

## 9. コンポーネント状態 [必須]

### 9.1 CTA Primary（`.btn--primary`）

| 状態 | 仕様 |
|---|---|
| default | `bg: --color-ink` / `color: --color-paper` / `shadow: --shadow-sm` |
| hover | `bg: --color-accent` / `color: #fff` / `shadow: --shadow-md` / `transform: translateY(-1px)` |
| active | `transform: translateY(0)` / `shadow: --shadow-sm` |
| focus-visible | 2px solid `--color-focus` / offset 3px |
| disabled | opacity 0.5 / cursor not-allowed |

### 9.2 CTA Ghost（`.btn--ghost`）

| 状態 | 仕様 |
|---|---|
| default | `bg: transparent` / `color: --color-ink` / 1px border `--color-ink` |
| hover | `bg: --color-ink` / `color: --color-paper` |
| active | `transform: translateY(1px)` |

### 9.3 ナビリンク（`.nav a`）

- default: `color: --color-ink-muted`
- hover/aria-current: `color: --color-ink` + 1px アンダーライン scaleX(0→1) `transform-origin: left` で transition 250ms
- focus-visible: 通常のフォーカスリング

### 9.4 記事カード（`.article`）

- 静的状態のみ。リンク hover で `color: --color-accent`、矢印アイコンが `translateX(3px)`

---

## 10. アイコン・画像 [必須]

- アイコン: **Lucide**（軽量・MIT）。tree-shake のため個別 import
- 線幅 1.4〜1.7px（細め）。塗りなし、`stroke="currentColor"`
- 装飾アイコンには `aria-hidden="true"`、意味アイコンには `aria-label`
- 画像: AVIF を優先、フォールバック WebP/JPEG。`width`/`height` 必須、ヒーローのみ `loading="eager"` + `fetchpriority="high"`

---

## 11. アクセシビリティ [必須]

- 全ページ `lang="ja"`、スキップリンク必須（実装済み: `BaseLayout.astro`）
- フォーカスリング `:focus-visible` 2px outline + 3px offset
- タッチターゲット最小 44×44（Header の menu-btn / フッタの SNS で実装）
- セマンティック HTML 優先（`<main>` `<header>` `<nav>` `<footer>` `<article>` `<aside>`）
- 色だけで意味を伝えない（チップにテキストラベル）
- `prefers-reduced-motion: reduce` でアニメ即時化

---

## 12. 記入例（モック）

確定したデザインは `kakuze-v2/docs/sprint-1-mock.html` に単一 HTML として保存済み。Astro コンポーネントへの分解は Step 5 で実施。

---

## 13. 更新履歴

| 日付 | 変更内容 | 対応者 |
|------|---------|--------|
| 2026-04-26 | 初版作成（Sprint 0 暫定値） | Claude Code |
| 2026-04-26 | Editorial Light 方向性で確定。frontend-design スキルでモック生成、配色 oklch 紙面型に再構成、シャドウ・コンポーネント状態を追加 | Claude Code（Opus 4.7） |

---

## 14. 参考リンク

- Ver1 サイト: https://kakuze-croquis.vercel.app/
- 参考: https://oo-box.net/30secdrow/index.html
- グローバル品質基準: `~/.claude/rules/web/design-quality.md`
- グローバルコーディングスタイル: `~/.claude/rules/web/coding-style.md`
- Sprint 1 入力: `kakuze-v2/docs/sprint-1-inputs.md`
- Sprint 1 モック HTML: `kakuze-v2/docs/sprint-1-mock.html`
