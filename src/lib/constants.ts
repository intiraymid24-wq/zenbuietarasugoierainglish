import { CategoryMeta, ToeicSubCategoryMeta, AppSettings, Level } from '@/types';

export const CATEGORY_META: CategoryMeta[] = [
  {
    id: 'daily',
    label: '日常会話',
    icon: '💬',
    description: '毎日使える基本的な表現',
    color: 'bg-blue-500',
  },
  {
    id: 'business',
    label: 'ビジネス',
    icon: '💼',
    description: '職場で使えるフォーマルな英語',
    color: 'bg-indigo-500',
  },
  {
    id: 'travel',
    label: '旅行',
    icon: '✈️',
    description: '海外旅行で役立つ表現',
    color: 'bg-sky-500',
  },
  {
    id: 'self-introduction',
    label: '自己紹介',
    icon: '🙋',
    description: '自分のことを英語で伝える',
    color: 'bg-emerald-500',
  },
  {
    id: 'emotions',
    label: '感情表現',
    icon: '😊',
    description: '気持ちや感想を表現する',
    color: 'bg-yellow-500',
  },
  {
    id: 'shopping',
    label: '買い物',
    icon: '🛍️',
    description: 'ショッピングで使う表現',
    color: 'bg-pink-500',
  },
  {
    id: 'health',
    label: '健康・医療',
    icon: '🏥',
    description: '体の状態や医療に関する表現',
    color: 'bg-red-400',
  },
  {
    id: 'toeic',
    label: 'TOEIC',
    icon: '📝',
    description: 'TOEIC頻出ビジネス英語',
    color: 'bg-violet-500',
  },
];

export const TOEIC_SUBCATEGORY_META: ToeicSubCategoryMeta[] = [
  { id: 'meeting',      label: '会議',    icon: '🤝' },
  { id: 'reservation',  label: '予約',    icon: '📅' },
  { id: 'delivery',     label: '納期',    icon: '📦' },
  { id: 'office',       label: 'オフィス', icon: '🏢' },
  { id: 'transport',    label: '交通',    icon: '🚉' },
  { id: 'email',        label: 'メール',  icon: '📧' },
  { id: 'hiring',       label: '採用',    icon: '👔' },
  { id: 'invoice',      label: '請求書',  icon: '🧾' },
  { id: 'product',      label: '商品説明', icon: '🏷️' },
  { id: 'announcement', label: 'お知らせ', icon: '📢' },
];

export const LEVEL_LABEL: Record<string, string> = {
  beginner:     '初級',
  intermediate: '中級',
  advanced:     '上級',
};

export const LEVEL_COLOR: Record<string, string> = {
  beginner:     'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced:     'bg-red-100 text-red-700',
};

export const RATING_CONFIG = {
  good: { label: 'できた！',     emoji: '⭕', color: 'bg-green-500 hover:bg-green-600 active:bg-green-700' },
  okay: { label: '微妙…',       emoji: '△',  color: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700' },
  bad:  { label: 'できなかった', emoji: '✗',  color: 'bg-red-500 hover:bg-red-600 active:bg-red-700' },
} as const;

// タイマーの目安時間（秒）。null = 無制限
export const TIMER_TARGETS: Record<Level | 'toeic' | 'review', number | null> = {
  beginner:     10,
  intermediate: 15,
  advanced:     20,
  toeic:        15,
  review:       null,
};

export const DEFAULT_SETTINGS: AppSettings = {
  dailyGoal:    20,
  showRomaji:   false,
  autoReveal:   false,
  soundEnabled: false,
  theme:        'light',
};

export const STORAGE_KEY          = 'instant-english-app-v1';
export const CUSTOM_QUESTIONS_KEY = 'shunsa-custom-questions-v1';
