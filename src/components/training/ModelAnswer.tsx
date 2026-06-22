import { Question } from '@/types';
import GrammarExplanation from './GrammarExplanation';

interface ModelAnswerProps {
  question: Question;
  userAnswer: string;
}

export default function ModelAnswer({ question, userAnswer }: ModelAnswerProps) {
  return (
    <div className="space-y-3">
      {/* 模範解答 */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-emerald-700 flex items-center gap-1">
          ✅ 模範解答
        </h3>
        <div className="space-y-2">
          {question.modelAnswers.map((ans, i) => (
            <p
              key={i}
              className={`leading-relaxed ${
                i === 0
                  ? 'text-base font-semibold text-gray-800'
                  : 'text-sm text-gray-500'
              }`}
            >
              {i > 0 && <span className="text-xs mr-1 text-gray-400">別解:</span>}
              {ans}
            </p>
          ))}
        </div>

        {userAnswer.trim() && (
          <div className="pt-3 border-t border-emerald-200">
            <p className="text-xs text-gray-400 font-medium mb-1">あなたの解答</p>
            <p className="text-sm text-gray-600 italic">{userAnswer}</p>
          </div>
        )}
      </div>

      {/* 文法解説（データがある問題のみ表示） */}
      <GrammarExplanation question={question} />

      {/*
        【将来実装予定】AI添削フィードバック
        MVP版では外部API課金を避けるため未実装。
        実装時の候補：
          - OpenAI API (GPT-4o) ※従量課金・要APIキー
          - Gemini API          ※従量課金・要APIキー
        実装方法：app/api/feedback/route.ts にサーバーサイドルートを作成し
        fetch('/api/feedback', { body: { userAnswer, modelAnswer } }) で呼ぶ。
        <AiFeedback userAnswer={userAnswer} modelAnswer={question.modelAnswers[0]} />
      */}
    </div>
  );
}
