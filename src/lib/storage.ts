import { StorageData, StudyRecord, StudySession, AppSettings } from '@/types';
import { DEFAULT_SETTINGS, STORAGE_KEY } from './constants';

function getDefaultData(): StorageData {
  return {
    studyRecords: [],
    sessions: [],
    settings: DEFAULT_SETTINGS,
    reviewList: [],
  };
}

export function loadData(): StorageData {
  if (typeof window === 'undefined') return getDefaultData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    return { ...getDefaultData(), ...JSON.parse(raw) };
  } catch {
    return getDefaultData();
  }
}

function saveData(data: StorageData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 学習記録を追加
export function addStudyRecord(record: StudyRecord): void {
  const data = loadData();
  // 同じ問題の既存レコードを更新（reviewCount を引き継ぐ）
  const idx = data.studyRecords.findIndex((r) => r.questionId === record.questionId);
  if (idx >= 0) {
    data.studyRecords[idx] = record;
  } else {
    data.studyRecords.push(record);
  }
  saveData(data);
}

// 復習リスト操作
export function addToReviewList(questionId: string): void {
  const data = loadData();
  if (!data.reviewList.includes(questionId)) {
    data.reviewList.push(questionId);
    saveData(data);
  }
}

export function removeFromReviewList(questionId: string): void {
  const data = loadData();
  data.reviewList = data.reviewList.filter((id) => id !== questionId);
  saveData(data);
}

// セッション操作
export function saveSession(session: StudySession): void {
  const data = loadData();
  const idx = data.sessions.findIndex((s) => s.sessionId === session.sessionId);
  if (idx >= 0) {
    data.sessions[idx] = session;
  } else {
    data.sessions.push(session);
  }
  saveData(data);
}

// 設定の更新
export function updateSettings(partial: Partial<AppSettings>): void {
  const data = loadData();
  data.settings = { ...data.settings, ...partial };
  saveData(data);
}

// 今日学習した問題数を返す
export function getTodayCount(): number {
  const data = loadData();
  const today = new Date().toDateString();
  return data.studyRecords.filter(
    (r) => new Date(r.studiedAt).toDateString() === today
  ).length;
}

// 連続学習日数を返す
export function getStreakDays(): number {
  const data = loadData();
  if (data.studyRecords.length === 0) return 0;

  const days = new Set(
    data.studyRecords.map((r) => new Date(r.studiedAt).toDateString())
  );
  const sorted = Array.from(days).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  let streak = 0;
  const now = new Date();
  for (let i = 0; i < sorted.length; i++) {
    const d = new Date(sorted[i]);
    const diff = Math.floor(
      (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff === i || diff === i + 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
