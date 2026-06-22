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
  | 'health'
  | 'toeic';

export type ToeicSubCategory =
  | 'meeting'
  | 'reservation'
  | 'delivery'
  | 'office'
  | 'transport'
  | 'email'
  | 'hiring'
  | 'invoice'
  | 'product'
  | 'announcement';

export interface Question {
  id: string;
  promptJapanese: string;
  modelAnswers: string[];
  category: Category;
  level: Level;
  grammarPoint: string;
  scene: string;
  // TOEIC サブカテゴリ（toeicカテゴリのみ）
  subCategory?: ToeicSubCategory;
  // 解説フィールド（将来の全問対応を見越して optional）
  keyPhrase?: string;        // 重要構文・キーフレーズ
  explanation?: string;      // 文法の詳しい解説
  commonMistake?: string;    // 日本人が間違えやすい点
  exampleSentence?: string;  // 追加例文
}

// ============================================================
// 学習記録の型
// ============================================================
export type SelfRating = 'good' | 'okay' | 'bad';

export interface StudyRecord {
  questionId: string;
  userAnswer: string;
  selfRating: SelfRating;
  studiedAt: string;
  reviewCount: number;
  lastReviewedAt?: string;
  // タイム関連
  timeTaken?: number;          // 回答までの秒数
  answeredInTime?: boolean;    // 目安時間内に回答できたか
  // 将来拡張フィールド
  aiFeedback?: string;
  speechTranscript?: string;
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
  dailyGoal: number;
  showRomaji: boolean;
  autoReveal: boolean;
  soundEnabled: boolean;
  theme: 'light' | 'dark';
}

// ============================================================
// localStorage に保存するデータ全体
// ============================================================
export interface StorageData {
  studyRecords: StudyRecord[];
  sessions: StudySession[];
  settings: AppSettings;
  reviewList: string[];
}

// ============================================================
// カテゴリ表示用メタデータ
// ============================================================
export interface CategoryMeta {
  id: Category;
  label: string;
  icon: string;
  description: string;
  color: string;
}

export interface ToeicSubCategoryMeta {
  id: ToeicSubCategory;
  label: string;
  icon: string;
}
