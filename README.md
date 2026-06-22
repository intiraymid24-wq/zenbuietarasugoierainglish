# 瞬間英作文トレーニングアプリ

日本語を見て瞬時に英文を作る「瞬間英作文」を練習するスマホファーストの学習アプリです。  
Duolingo・Anki・スピフルのように毎日反復しやすいシンプルなUIを目指しています。

---

## 💰 課金・外部API について（重要）

> **現時点では外部API不使用・APIキー不要・課金ゼロで動作します。**

### MVP版で使用していないもの

| サービス | 用途 | 状態 |
|---|---|---|
| OpenAI API (GPT-4o 等) | AI添削・意味判定 | **未使用** |
| OpenAI Whisper API | 音声文字起こし | **未使用** |
| Google Cloud Speech-to-Text | 音声認識 | **未使用** |
| Azure Cognitive Services | 音声・AI全般 | **未使用** |
| Firebase / Supabase | クラウドDB・認証 | **未使用** |
| Stripe / その他決済 | 課金処理 | **未使用** |

### なぜ課金が発生しないのか

```
外部サービスに一切接続しない
         ↓
APIキーが存在しない
         ↓
APIコールが発生しない
         ↓
従量課金が発生しない
```

- **問題データ**：`src/data/questions.json`（ローカルJSONファイル）
- **学習履歴**：ブラウザの `localStorage`（端末内のみ・サーバー送信なし）
- **ネットワーク通信**：なし（インターネット接続なしで動作可能）
- **アカウント登録**：不要

---

## 🚀 起動方法

### 必要なもの

- Node.js 18 以上（推奨: 18.x）
- npm

### 手順

```bash
# 1. プロジェクトディレクトリに移動
cd instant-english-app

# 2. 依存パッケージをインストール（初回のみ）
npm install

# 3. 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

### 本番ビルド

```bash
# ビルド（エラーチェックも兼ねる）
npm run build

# 本番サーバーを起動
npm start
```

---

## 📱 使い方

### 基本の流れ

```
ホーム → カテゴリ選択 → 練習開始
                              ↓
                  日本語を見て英文を考える
                              ↓
                        英文を入力する
                              ↓
                      「答えを見る」をタップ
                              ↓
                  模範解答と自分の答えを比較
                              ↓
          「できた」「微妙」「できなかった」で自己評価
                              ↓
              次の問題へ（自動で進む）
```

### 各画面の説明

| 画面 | 機能 |
|---|---|
| 🏠 **ホーム** | 今日の学習数・連続記録・クイックスタート |
| 📚 **カテゴリ** | 7カテゴリから選んで練習 |
| ✍️ **トレーニング** | 瞬間英作文の練習本体 |
| 🔁 **復習** | 「微妙」「できなかった」問題を再練習 |
| 📊 **履歴** | 30日間のカレンダーと成績グラフ |
| ⚙️ **設定** | 1日の目標問題数など |

### 自己評価の目安

| ボタン | 意味 | 復習リストへ |
|---|---|---|
| ⭕ **できた！** | 英文がすぐに出てきた | 追加しない（できれば削除） |
| △ **微妙…** | 出てきたが自信がない | 追加する |
| ✗ **できなかった** | 英文が出てこなかった | 追加する |

---

## 📂 問題データの追加方法

`src/data/questions.json` に以下の形式で追記するだけです。

```json
{
  "id": "カテゴリ-通し番号",
  "promptJapanese": "日本語の問題文",
  "modelAnswers": ["模範解答1", "別解2（省略可）"],
  "category": "daily",
  "level": "beginner",
  "grammarPoint": "重点文法",
  "scene": "使用シーン"
}
```

**カテゴリ一覧：**
- `daily`（日常会話）
- `business`（ビジネス）
- `travel`（旅行）
- `self-introduction`（自己紹介）
- `emotions`（感情表現）
- `shopping`（買い物）
- `health`（健康・医療）

**レベル：** `beginner` / `intermediate` / `advanced`

---

## 🗂 プロジェクト構成

```
src/
├── app/                    # ページ（Next.js App Router）
│   ├── page.tsx            # ホーム
│   ├── categories/         # カテゴリ選択
│   ├── training/           # トレーニング本体
│   ├── review/             # 復習
│   ├── history/            # 学習履歴
│   └── settings/           # 設定
├── components/
│   ├── layout/             # BottomNav（ボトムナビ）
│   ├── training/           # QuestionCard, AnswerInput, ModelAnswer, SelfRatingButtons
│   ├── home/               # StatsCard
│   ├── history/            # CalendarHeatmap
│   └── ui/                 # Button, ProgressBar
├── data/
│   └── questions.json      # 問題データ（39問）
├── hooks/
│   ├── useStudySession.ts  # 学習セッション管理
│   ├── useLocalStorage.ts  # localStorage ラッパー
│   └── useVoiceInput.ts    # 【スタブ】音声入力（MVP版では無効）
├── lib/
│   ├── constants.ts        # カテゴリ定義・評価設定
│   └── storage.ts          # localStorage 読み書き
└── types/
    └── index.ts            # 型定義（将来フィールド含む）
```

---

## 🔮 将来追加予定の機能（MVP版では未実装）

以下の機能はコードの型・コメント・スタブとして準備済みですが、**外部APIの課金が発生するためMVP版では無効**です。

| 機能 | 必要なAPI | 課金形態 |
|---|---|---|
| 🎤 音声入力・発話の文字起こし | OpenAI Whisper / Google STT | 従量課金 |
| 🤖 AI添削・意味判定 | OpenAI GPT / Gemini | 従量課金 |
| 💬 独り言英会話モード | LLM API + 音声合成 | 従量課金 |
| 📈 発話スピード測定 | なし（Web標準のみ） | 無料で実装可能 |

将来実装する際は：
1. `.env.local` にAPIキーを設定（Gitにコミットしない）
2. `src/app/api/` にサーバーサイドルートを作成してキーを隠す
3. 各スタブ（`useVoiceInput.ts` 等）の実装を埋める

---

## 🛠 技術スタック

| 技術 | バージョン | 用途 |
|---|---|---|
| Next.js | 14.x | フレームワーク |
| React | 19.x | UIライブラリ |
| TypeScript | 5.x | 型安全 |
| Tailwind CSS | 3.x | スタイリング |
| localStorage | ブラウザ標準 | データ保存 |

**外部ライブラリ（npm）：Next.js / React / Tailwind CSS / TypeScript のみ。AI・課金・通信系は一切なし。**

---

## 📝 ライセンス

個人学習用のプロジェクトです。
