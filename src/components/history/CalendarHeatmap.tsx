'use client';

import { StudyRecord } from '@/types';

interface CalendarHeatmapProps {
  records: StudyRecord[];
}

export default function CalendarHeatmap({ records }: CalendarHeatmapProps) {
  // 過去30日分のデータを作成
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d;
  });

  const countByDay = days.map((day) => {
    const count = records.filter(
      (r) => new Date(r.studiedAt).toDateString() === day.toDateString()
    ).length;
    return { date: day, count };
  });

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count < 5)   return 'bg-indigo-200';
    if (count < 10)  return 'bg-indigo-400';
    return 'bg-indigo-600';
  };

  return (
    <div>
      <p className="text-xs text-gray-400 mb-2">過去30日の学習記録</p>
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}>
        {countByDay.map(({ date, count }) => (
          <div
            key={date.toISOString()}
            title={`${date.getMonth() + 1}/${date.getDate()}: ${count}問`}
            className={`aspect-square rounded-md ${getColor(count)}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 justify-end">
        <span className="text-xs text-gray-400">少ない</span>
        {['bg-gray-100', 'bg-indigo-200', 'bg-indigo-400', 'bg-indigo-600'].map((c) => (
          <div key={c} className={`w-4 h-4 rounded-sm ${c}`} />
        ))}
        <span className="text-xs text-gray-400">多い</span>
      </div>
    </div>
  );
}
