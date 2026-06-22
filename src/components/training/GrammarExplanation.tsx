import { Question } from '@/types';

interface GrammarExplanationProps {
  question: Question;
}

export default function GrammarExplanation({ question }: GrammarExplanationProps) {
  const hasAny = question.keyPhrase || question.explanation || question.commonMistake || question.exampleSentence;
  if (!hasAny) return null;

  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 space-y-3">
      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">📖 文法・構文解説</p>

      {question.keyPhrase && (
        <div>
          <p className="text-xs font-bold text-indigo-500 mb-1">重要構文</p>
          <p className="text-sm font-semibold text-gray-800 bg-white rounded-lg px-3 py-2 border border-indigo-100">
            {question.keyPhrase}
          </p>
        </div>
      )}

      {question.explanation && (
        <div>
          <p className="text-xs font-bold text-indigo-500 mb-1">文法ポイント</p>
          <p className="text-sm text-gray-700 leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {question.commonMistake && (
        <div>
          <p className="text-xs font-bold text-orange-500 mb-1">⚠️ 日本人が間違えやすい点</p>
          <p className="text-sm text-orange-700 bg-orange-50 rounded-lg px-3 py-2 border border-orange-100 leading-relaxed">
            {question.commonMistake}
          </p>
        </div>
      )}

      {question.exampleSentence && (
        <div>
          <p className="text-xs font-bold text-indigo-500 mb-1">例文</p>
          <p className="text-sm text-gray-600 italic bg-white rounded-lg px-3 py-2 border border-indigo-100">
            {question.exampleSentence}
          </p>
        </div>
      )}
    </div>
  );
}
