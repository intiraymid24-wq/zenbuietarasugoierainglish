// ============================================================
// 問題データの型
// ============================================================
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Category =
  | 'daily'
  | 'business'
  | 'travel'
  | 'self-introduction'
  | 'emotions'
  | 'shopping'
  | 'health';

export interface Question {
  id: string;
  promptJapanese: string;
  modelAnswers: string[];    // 複数の模範解答（表現のバリエーション）
  category: Category;
  level: Level;
  grammarPoint: string;      // 重点文法項目（例: "現在完了"）
  scene: string;             // 使用シーン（例: "職場での会話"）
}

// ============================================================
// 学習記録の型
// ============================================================
export type SelfRating = 'good' | 'okay' | 'bad';

export interface StudyRecord {
  questionId: string;
  userAnswer: string;
  selfRating: SelfRating;
  studiedAt: string;         // ISO 8601 形式
  // --- 将来拡張フィールド ---
  aiFeedback?: string;       // AI による採点・フィードバック
  speechTranscript?: string; // 音声入力の文字起こし
  responseTime?: number;     // 回答までの秒数
  reviewCount: number;       // この問題を何回復習したか
  lastReviewedAt?: string;   // 最後に復習した日時
}

// ============================================================
// 学習セッションの型
// ============================================================
export interface StudySession {
  sessionId: string;
  category: Category | 'review' | 'all';
  startedAt: string;
  endedAt?: string;
  totalQuestions: number;
  goodCount: number;
  okayCount: number;
  badCount: number;
}

// ============================================================
// アプリ設定の型
// ============================================================
export interface AppSettings {
  dailyGoal: number;         // 1日の目標問題数
  showRomaji: boolean;       // ローマ字表示
  autoReveal: boolean;       // 自動で答えを表示
  soundEnabled: boolean;     // 効果音（将来用）
  theme: 'light' | 'dark';
}

// ============================================================
// localStorageに保存するデータ全体の型
// ============================================================
export interface StorageData {
  studyRecords: StudyRecord[];
  sessions: StudySession[];
  settings: AppSettings;
  reviewList: string[];      // 復習リストに入っている問題ID
}

// ============================================================
// カテゴリ表示用メタデータ
// ============================================================
export interface CategoryMeta {
  id: Category;
  label: string;             // 日本語ラベル
  icon: string;              // 絵文字アイコン
  description: string;
  color: string;             // Tailwind bg クラス
}
