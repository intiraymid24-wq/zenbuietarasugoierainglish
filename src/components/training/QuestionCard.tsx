import { Question } from '@/types';
import { LEVEL_LABEL, LEVEL_COLOR, CATEGORY_META } from '@/lib/constants';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalCount: number;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalCount,
}: QuestionCardProps) {
  const categoryMeta = CATEGORY_META.find((c) => c.id === question.category);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{categoryMeta?.icon}</span>
          <span className="text-sm text-gray-500">{categoryMeta?.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${LEVEL_COLOR[question.level]}`}>
            {LEVEL_LABEL[question.level]}
          </span>
          <span className="text-sm text-gray-400">
            {questionNumber} / {totalCount}
          </span>
        </div>
      </div>

      {/* 問題文 */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-2 font-medium">次の日本語を英語にしてください</p>
        <p className="text-2xl font-bold text-gray-800 leading-relaxed">
          {question.promptJapanese}
        </p>
      </div>

      {/* 文法ポイント */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-1 rounded-full">
          🎯 {question.grammarPoint}
        </span>
      </div>
    </div>
  );
}
