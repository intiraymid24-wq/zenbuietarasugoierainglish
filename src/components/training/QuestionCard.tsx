import { Question } from '@/types';
import { LEVEL_LABEL, LEVEL_COLOR, CATEGORY_META, TOEIC_SUBCATEGORY_META } from '@/lib/constants';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalCount: number;
  // タイマー関連（省略可能。review モードなどタイマー不要な場合は省略）
  elapsed?: number;
  targetSeconds?: number | null;
  isOverTime?: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalCount,
  elapsed,
  targetSeconds,
  isOverTime,
}: QuestionCardProps) {
  const categoryMeta = CATEGORY_META.find((c) => c.id === question.category);
  const subCategoryMeta = question.subCategory
    ? TOEIC_SUBCATEGORY_META.find((s) => s.id === question.subCategory)
    : null;

  const showTimer = elapsed !== undefined && targetSeconds !== undefined && targetSeconds !== null;

  // タイマーバーの進行度（0〜100%）
  const timerProgress = showTimer && targetSeconds
    ? Math.min(100, Math.round((elapsed! / targetSeconds) * 100))
    : 0;

  const timerColor = isOverTime
    ? 'bg-red-400'
    : timerProgress > 70
    ? 'bg-orange-400'
    : 'bg-indigo-400';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* タイマーバー */}
      {showTimer && (
        <div className="w-full bg-gray-100 h-1.5">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${timerColor}`}
            style={{ width: `${timerProgress}%` }}
          />
        </div>
      )}

      <div className="p-5">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">{categoryMeta?.icon}</span>
            <span className="text-sm text-gray-500">{categoryMeta?.label}</span>
            {subCategoryMeta && (
              <>
                <span className="text-gray-300 text-xs">›</span>
                <span className="text-xs text-gray-400">{subCategoryMeta.icon} {subCategoryMeta.label}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${LEVEL_COLOR[question.level]}`}>
              {LEVEL_LABEL[question.level]}
            </span>
            {/* タイマー表示 */}
            {showTimer && (
              <span className={`text-xs font-bold tabular-nums ${isOverTime ? 'text-red-500' : 'text-gray-400'}`}>
                {isOverTime
                  ? `+${elapsed! - targetSeconds!}s`
                  : `${elapsed}s`}
              </span>
            )}
          </div>
        </div>

        {/* 問題文 */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2 font-medium">次の日本語を英語にしてください</p>
          <p className="text-2xl font-bold text-gray-800 leading-relaxed">
            {question.promptJapanese}
          </p>
        </div>

        {/* 文法ポイント + 目安時間 */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
          <span className="text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-1 rounded-full truncate">
            🎯 {question.grammarPoint}
          </span>
          {showTimer && targetSeconds && (
            <span className="text-xs text-gray-400 flex-shrink-0">
              目安 {targetSeconds}秒
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
