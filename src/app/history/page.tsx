'use client';

import { useEffect, useState } from 'react';
import { StudyRecord } from '@/types';
import { loadData } from '@/lib/storage';
import { CATEGORY_META, LEVEL_LABEL } from '@/lib/constants';
import CalendarHeatmap from '@/components/history/CalendarHeatmap';
import questionsData from '@/data/questions.json';
import { Question } from '@/types';

const allQuestions = questionsData as Question[];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

export default function HistoryPage() {
  const [records, setRecords] = useState<StudyRecord[]>([]);

  useEffect(() => {
    const data = loadData();
    // 新しい順に並び替え
    setRecords([...data.studyRecords].sort(
      (a, b) => new Date(b.studiedAt).getTime() - new Date(a.studiedAt).getTime()
    ));
  }, []);

  const good = records.filter((r) => r.selfRating === 'good').length;
  const okay = records.filter((r) => r.selfRating === 'okay').length;
  const bad  = records.filter((r) => r.selfRating === 'bad').length;
  const total = records.length;

  const ratingEmoji: Record<string, string> = {
    good: '⭕',
    okay: '△',
    bad: '✗',
  };
  const ratingLabel: Record<string, string> = {
    good: 'できた',
    okay: '微妙',
    bad: 'できなかった',
  };
  const ratingColor: Record<string, string> = {
    good: 'text-green-500',
    okay: 'text-yellow-500',
    bad: 'text-red-500',
  };

  return (
    <div className="px-4 pt-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">学習履歴</h1>
        <p className="text-sm text-gray-500 mt-1">これまでの学習の記録</p>
      </div>

      {/* ヒートマップ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <CalendarHeatmap records={records} />
      </div>

      {/* 集計 */}
      {total > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-600 mb-4">累計成績</h2>
          <div className="flex gap-4 items-center">
            <div className="flex-1 space-y-2">
              {[
                { label: 'できた', count: good, color: 'bg-green-500' },
                { label: '微妙', count: okay, color: 'bg-yellow-500' },
                { label: 'できなかった', count: bad, color: 'bg-red-500' },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-sm text-gray-600 w-24">{label}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full`}
                      style={{ width: total > 0 ? `${(count / total) * 100}%` : '0%' }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-700 w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-right">累計 {total} 問</p>
        </div>
      )}

      {/* 履歴リスト */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-gray-500">学習ログ</h2>
        {records.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <p className="text-4xl">📋</p>
            <p className="text-gray-500">まだ学習記録がありません</p>
          </div>
        ) : (
          records.slice(0, 30).map((record) => {
            const q = allQuestions.find((q) => q.id === record.questionId);
            const cat = q ? CATEGORY_META.find((c) => c.id === q.category) : null;
            return (
              <div
                key={`${record.questionId}-${record.studiedAt}`}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {q?.promptJapanese ?? record.questionId}
                    </p>
                    {record.userAnswer && (
                      <p className="text-xs text-gray-400 mt-1 italic truncate">
                        "{record.userAnswer}"
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      {cat && (
                        <span className="text-xs text-gray-400">
                          {cat.icon} {cat.label}
                        </span>
                      )}
                      <span className="text-xs text-gray-300">
                        {formatDate(record.studiedAt)}
                      </span>
                    </div>
                  </div>
                  <div className={`text-xl flex-shrink-0 ${ratingColor[record.selfRating]}`}>
                    {ratingEmoji[record.selfRating]}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
