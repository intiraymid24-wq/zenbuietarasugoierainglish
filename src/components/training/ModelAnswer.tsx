interface ModelAnswerProps {
  answers: string[];
  userAnswer: string;
}

export default function ModelAnswer({ answers, userAnswer }: ModelAnswerProps) {
  return (
    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 space-y-4">
      <div>
        <h3 className="text-sm font-bold text-emerald-700 mb-3 flex items-center gap-1">
          ✅ 模範解答
        </h3>
        <div className="space-y-2">
          {answers.map((ans, i) => (
            <p
              key={i}
              className={`text-base font-medium text-gray-800 leading-relaxed ${
                i > 0 ? 'text-gray-500 text-sm' : ''
              }`}
            >
              {i === 0 ? '' : '別解: '}{ans}
            </p>
          ))}
        </div>
      </div>

      {userAnswer.trim() && (
        <div className="pt-3 border-t border-emerald-200">
          <p className="text-xs text-gray-500 mb-1 font-medium">あなたの解答</p>
          <p className="text-base text-gray-700 italic">{userAnswer}</p>
          {/*
            【将来実装予定】AI添削フィードバック
            MVP版では外部API課金を避けるため未実装。
            実装時の候補：
              - OpenAI API (GPT-4o) ※従量課金・要APIキー
              - Gemini API          ※従量課金・要APIキー
            実装方法：app/api/feedback/route.ts にサーバーサイドルートを作成し
            クライアントから fetch('/api/feedback', { body: { userAnswer, modelAnswer } }) で呼ぶ。
            <AiFeedback userAnswer={userAnswer} modelAnswer={answers[0]} />
          */}
        </div>
      )}
    </div>
  );
}
