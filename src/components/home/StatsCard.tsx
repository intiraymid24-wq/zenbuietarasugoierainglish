'use client';

import { useEffect, useState } from 'react';
import { getTodayCount, getStreakDays, loadData } from '@/lib/storage';

export default function StatsCard() {
  const [todayCount, setTodayCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    setTodayCount(getTodayCount());
    setStreak(getStreakDays());
    const data = loadData();
    setTotalCount(data.studyRecords.length);
    setReviewCount(data.reviewList.length);
  }, []);

  const stats = [
    { label: '今日', value: todayCount, unit: '問', emoji: '📅' },
    { label: '連続', value: streak, unit: '日', emoji: '🔥' },
    { label: '累計', value: totalCount, unit: '問', emoji: '📚' },
    { label: '復習', value: reviewCount, unit: '問', emoji: '🔁' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map(({ label, value, unit, emoji }) => (
        <div
          key={label}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 flex flex-col items-center"
        >
          <span className="text-xl mb-1">{emoji}</span>
          <span className="text-xl font-bold text-gray-800">{value}</span>
          <span className="text-xs text-gray-400">{unit}</span>
          <span className="text-xs text-gray-500 mt-0.5">{label}</span>
        </div>
      ))}
    </div>
  );
}
