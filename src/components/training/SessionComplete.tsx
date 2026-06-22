'use client';

import Link from 'next/link';
import { StudyRecord } from '@/types';
import Button from '@/components/ui/Button';

interface SessionCompleteProps {
  results: StudyRecord[];
  onRestart: () => void;
}

export default function SessionComplete({ results, onRestart }: SessionCompleteProps) {
  const good = results.filter((r) => r.selfRating === 'good').length;
  const okay = results.filter((r) => r.selfRating === 'okay').length;
  const bad  = results.filter((r) => r.selfRating === 'bad').length;
  const total = results.length;
  const score = total > 0 ? Math.round((good / total) * 100) : 0;

  const emoji = score >= 80 ? '🎉' : score >= 50 ? '💪' : '📖';
  const message =
    score >= 80
      ? 'すばらしい！\nどんどん上達してます！'
      : score >= 50
      ? 'いい調子！\n復習してさらに上達しよう！'
      : '基礎固めをしよう！\n復習リストで繰り返し練習！';

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center space-y-8">
      <div>
        <div className="text-7xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">セッション完了！</h2>
        <p className="text-gray-500 whitespace-pre-line">{message}</p>
      </div>

      {/* スコアサークル */}
      <div className="relative w-36 h-36">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 144 144">
          <circle cx="72" cy="72" r="60" fill="none" stroke="#e5e7eb" strokeWidth="12" />
          <circle
            cx="72" cy="72" r="60"
            fill="none"
            stroke="#4f46e5"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 60}`}
            strokeDashoffset={`${2 * Math.PI * 60 * (1 - score / 100)}`}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-indigo-600">{score}%</span>
          <span className="text-xs text-gray-400">正解率</span>
        </div>
      </div>

      {/* 内訳 */}
      <div className="flex gap-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-500">{good}</p>
          <p className="text-xs text-gray-400">できた</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-500">{okay}</p>
          <p className="text-xs text-gray-400">微妙</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-500">{bad}</p>
          <p className="text-xs text-gray-400">できなかった</p>
        </div>
      </div>

      {/* ボタン */}
      <div className="w-full space-y-3">
        <Button variant="primary" size="lg" fullWidth onClick={onRestart}>
          もう一度
        </Button>
        {(okay > 0 || bad > 0) && (
          <Link href="/review" className="block">
            <Button variant="secondary" size="lg" fullWidth>
              復習リストへ ({okay + bad}問)
            </Button>
          </Link>
        )}
        <Link href="/" className="block">
          <Button variant="ghost" size="md" fullWidth>
            ホームへ戻る
          </Button>
        </Link>
      </div>
    </div>
  );
}
